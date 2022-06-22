type Log = typeof console.log

interface Logger {
  error: Log
  warn: Log
  info: Log
  http: Log
  verbose: Log
  debug: Log
  silly: Log
}

const winstonLogMethods: Array<keyof Logger> = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']

export const prefixLog =
  (prefixes: string) =>
  (logger: Log): Log =>
  (...args: any[]) => {
    const [firstArg, ...othersArgs] = args
    return logger(prefixes + ' ' + firstArg, ...othersArgs)
  }

/**
 * prefixedMethods is only 1 level deep. It cannot contain path like ['log.error', 'something.debug']
 */
export const prefixLogger =
  (prefixes: string) =>
  (logger: Logger, prefixedMethods: string[] = winstonLogMethods) => {
    const loggerCpy = {...logger}
    prefixedMethods.forEach(m => {
      // @ts-ignore
      loggerCpy[m] = prefixLog(prefixes)(loggerCpy[m])
    })
    return loggerCpy
  }
