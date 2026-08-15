type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  readonly [key: string]: unknown;
}

const PREFIX = '[smartrail]';

function format(level: LogLevel, tag: string, message: string): string {
  return `${PREFIX} ${level.toUpperCase()} ${tag} ${message}`;
}

/**
 * Structured application logger.
 * Wraps the global console with tagged messages. Server-side only; client
 * usage (e.g. in a React component) should pass errors here sparingly since
 * browser console is always visible to end users.
 */
export const logger = {
  debug(tag: string, message: string, context?: LogContext): void {
    if (context) {
      console.debug(format('debug', tag, message), context);
    } else {
      console.debug(format('debug', tag, message));
    }
  },

  info(tag: string, message: string, context?: LogContext): void {
    if (context) {
      console.log(format('info', tag, message), context);
    } else {
      console.log(format('info', tag, message));
    }
  },

  warn(tag: string, message: string, context?: LogContext): void {
    if (context) {
      console.warn(format('warn', tag, message), context);
    } else {
      console.warn(format('warn', tag, message));
    }
  },

  error(tag: string, message: string, context?: LogContext): void {
    if (context) {
      console.error(format('error', tag, message), context);
    } else {
      console.error(format('error', tag, message));
    }
  },
};
