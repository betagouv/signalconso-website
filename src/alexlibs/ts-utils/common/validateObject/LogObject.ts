export interface LogObjectConfig {
  prefix?: string,
  log?: (message?: any, ...optionalParams: any[]) => void,
  indent?: string
  truncate?: number,
  hiddenKeys?: string[],
}

export const logObject = (
  o: {[key: string]: any},
  {
    prefix = '- ',
    indent = '  ',
    log = console.log,
    truncate,
    hiddenKeys = []
  }: LogObjectConfig = {}
): void => {
  const formatLog = (prefix: string, k: string, v?: string): string => `${prefix}${k}: ${v === undefined ? '' : v}`;
  Object.keys(o).forEach(k => {
    const isHidden = hiddenKeys.indexOf(k) > -1;
    if (isHidden) {
      log(formatLog(prefix, k, parseValue('', true)));
    } else {
      if (typeof o[k] === 'object') {
        const subPath = getSubPaths(hiddenKeys, k);
        log(formatLog(prefix, k));
        logObject(o[k], {prefix: `${indent}${prefix}`, log, indent, truncate, hiddenKeys: subPath});
      } else {
        log(formatLog(prefix, k, parseValue(o[k], isHidden, truncate)));
      }
    }
  });
};

const getSubPaths = (paths: string[], currentKey: string,): string[] => {
  const subPaths = paths.filter(path => path.split('.')[0] === currentKey);
  return subPaths.map(path => path.split('.').slice(1).join('.'));
};

const parseValue = (value: string, hidden: boolean = false, truncate?: number): string => {
  try {
    if (hidden) return '<hidden>';
    const isValueTooLong = truncate && value.length > truncate;
    return isValueTooLong ? (value.substring(0, truncate) + '...') : value;
  } catch (e) {
    return value;
  }
};

