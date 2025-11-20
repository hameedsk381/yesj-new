"use client"

import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-primary mb-4">Something went wrong</h1>
              <p className="text-muted-foreground font-extralight">
                We apologize for the inconvenience. Please try refreshing the page.
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex h-10 items-center justify-center rounded-none px-8 bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex h-10 items-center justify-center rounded-none px-8 border border-secondary hover:bg-pink-50 text-secondary transition-colors ml-4"
              >
                Go Home
              </button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded text-left">
                <p className="text-sm text-red-800 font-mono">{this.state.error.message}</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
