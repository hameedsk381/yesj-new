"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-primary mb-4">Application Error</h1>
              <p className="text-muted-foreground font-extralight">
                A critical error has occurred. We apologize for the inconvenience.
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => reset()}
                className="inline-flex h-10 items-center justify-center rounded-none px-8 bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex h-10 items-center justify-center rounded-none px-8 border border-secondary hover:bg-pink-50 text-secondary transition-colors ml-4"
              >
                Go Home
              </button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded text-left">
                <p className="text-sm text-red-800 font-mono">{error.message}</p>
                {error.digest && <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
