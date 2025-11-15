type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  stack?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      stack: error?.stack,
    }

    if (this.isDevelopment) {
      const formattedMessage = this.formatLog(entry)
      
      switch (level) {
        case 'error':
          console.error(formattedMessage, context, error)
          break
        case 'warn':
          console.warn(formattedMessage, context)
          break
        case 'debug':
          console.debug(formattedMessage, context)
          break
        default:
          console.log(formattedMessage, context)
      }
    }

    if (level === 'error' && typeof window !== 'undefined') {
      this.sendToErrorTracking(entry)
    }
  }

  private sendToErrorTracking(entry: LogEntry) {
    // TODO: Integrate with Sentry or similar service
    // Example:
    // Sentry.captureException(new Error(entry.message), {
    //   level: entry.level,
    //   extra: entry.context,
    // })
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context)
  }

  error(message: string, context?: Record<string, any>, error?: Error) {
    this.log('error', message, context, error)
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context)
  }
}

export const logger = new Logger()
