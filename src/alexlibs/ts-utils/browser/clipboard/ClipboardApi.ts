export class ClipboardApi {

  static readonly copy = (text: string) => {
    const copyFrom = document.createElement('textarea')
    copyFrom.textContent = text
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(copyFrom)
    copyFrom.select()
    document.execCommand('copy')
    body.removeChild(copyFrom)
  }
}
