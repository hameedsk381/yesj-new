"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Loader2 } from "lucide-react"
import { getRazorpayConfig } from "@/lib/payment"
import { logger } from "@/lib/logger"

interface PaymentButtonProps {
  amount: number
  eventName: string
  eventId?: string
  onSuccess?: () => void
  onFailure?: (error: string) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentButton({ 
  amount, 
  eventName, 
  eventId,
  onSuccess,
  onFailure 
}: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      alert("Please fill all required fields")
      return
    }

    setIsProcessing(true)

    try {
      const scriptLoaded = await loadRazorpayScript()

      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway")
      }

      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          description: `Registration for ${eventName}`,
          eventId,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to initiate payment")
      }

      const config = getRazorpayConfig()

      const options = {
        key: config.keyId,
        amount: amount * 100,
        currency: config.currency,
        name: config.name,
        description: `Payment for ${eventName}`,
        image: config.image,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              logger.info("Payment successful", {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              })
              onSuccess?.()
            } else {
              throw new Error("Payment verification failed")
            }
          } catch (error) {
            logger.error("Payment verification error", {}, error as Error)
            onFailure?.(error instanceof Error ? error.message : "Payment verification failed")
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: config.theme,
        modal: {
          ondismiss: function () {
            setIsProcessing(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      logger.error("Payment initiation error", {}, error as Error)
      onFailure?.(error instanceof Error ? error.message : "Payment failed")
      setIsProcessing(false)
    }
  }

  if (!showForm) {
    return (
      <Button
        onClick={() => setShowForm(true)}
        className="w-full rounded-none bg-primary hover:bg-primary/90 text-white"
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Pay ₹{amount}
      </Button>
    )
  }

  return (
    <div className="space-y-4 p-6 border border-primary/10 rounded-lg bg-blue-50">
      <h3 className="text-lg font-light text-primary mb-4">Payment Details</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={userDetails.phone}
            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
            disabled={isProcessing}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded border border-primary/10">
          <span className="text-sm font-light">Total Amount:</span>
          <span className="text-xl font-semibold text-primary">₹{amount}</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 rounded-none bg-primary hover:bg-primary/90 text-white"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Pay
              </>
            )}
          </Button>
          <Button
            onClick={() => setShowForm(false)}
            variant="outline"
            disabled={isProcessing}
            className="rounded-none border-primary text-primary"
          >
            Cancel
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Secure payment powered by Razorpay
      </p>
    </div>
  )
}
