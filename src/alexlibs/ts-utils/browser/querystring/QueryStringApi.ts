export class QueryStringApi {
  static readonly toObject = (qs: string): {[key: string]: string} => qs
    .replace(/^\??/, '')
    .split('&')
    .map(_ => _.split('='))
    .filter(_ => _[0] !== '')
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});

  static readonly fromObject = (obj: {[key: string]: string | number | boolean}): string => '?' + Object.keys(obj)
    .filter(k => obj[k] !== undefined)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');

}
