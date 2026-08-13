"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserRound, Loader2 } from "lucide-react"
import Link from "next/link"

export default function MemberLoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/member-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Token is set in httpOnly cookie by the API
      window.location.href = "/member/dashboard"
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-primary/10 rounded-md shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 mb-4">
              <UserRound className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-light text-primary mb-2">Member Login</h1>
            <p className="text-sm text-muted-foreground font-extralight">
              Access your YESJ membership dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter the email you registered with"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-primary hover:bg-primary/90 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Haven't registered yet?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Apply for membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}