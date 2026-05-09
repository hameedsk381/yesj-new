import crypto from 'crypto'
import { logger } from './logger'

interface PaymentOptions {
  amount: number
  currency?: string
  name: string
  email: string
  phone: string
  description: string
  eventId?: string
}

interface PaymentResponse {
  success: boolean
  orderId?: string
  error?: string
}

export async function initiatePayment(options: PaymentOptions): Promise<PaymentResponse> {
  try {
    // TODO: Integrate with Razorpay
    // const Razorpay = require('razorpay')
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // })

    // const order = await razorpay.orders.create({
    //   amount: options.amount * 100, // Convert to paise
    //   currency: options.currency || 'INR',
    //   receipt: `receipt_${Date.now()}`,
    //   notes: {
    //     eventId: options.eventId,
    //     name: options.name,
    //     email: options.email,
    //   },
    // })

    logger.info('Payment initiated', {
      amount: options.amount,
      email: options.email,
      description: options.description,
    })

    // Mock order ID for development
    const orderId = `order_${Date.now()}`

    return {
      success: true,
      orderId,
    }
  } catch (error) {
    logger.error('Payment initiation failed', {
      amount: options.amount,
      email: options.email,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, error as Error)

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment initiation failed',
    }
  }
}

export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      logger.error('RAZORPAY_KEY_SECRET is not configured', { orderId, paymentId })
      return false
    }

    if (!orderId || !paymentId || !signature) {
      return false
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const expectedBuf = Buffer.from(expected, 'hex')
    const providedBuf = Buffer.from(signature, 'hex')

    if (expectedBuf.length !== providedBuf.length) {
      logger.warn('Payment signature length mismatch', { orderId, paymentId })
      return false
    }

    const isValid = crypto.timingSafeEqual(expectedBuf, providedBuf)

    logger.info('Payment verification', { orderId, paymentId, isValid })
    return isValid
  } catch (error) {
    logger.error('Payment verification failed', {
      orderId,
      paymentId,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, error as Error)

    return false
  }
}

export function getRazorpayConfig() {
  return {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    currency: 'INR',
    name: 'YESJ',
    description: 'Event Registration Payment',
    image: '/YESJ_Logo_Black-eaf43d27.png',
    theme: {
      color: '#007BFF', // blue
    },
  }
}
