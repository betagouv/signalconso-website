import axios, {AxiosInstance, AxiosResponse, ResponseType} from 'axios'
import * as qs from 'qs'

interface RequestOptions {
  // all these could probably be typed better
  readonly qs?: any
  readonly headers?: any
  readonly body?: any
  readonly timeout?: number
  readonly responseType?: ResponseType
}

type StatusCode = 'front-side' | 200 | 301 | 302 | 400 | 401 | 403 | 404 | 423 | 500 | 504

interface ApiErrorDetails {
  code: StatusCode
  id?: string
  request: {
    method: Method
    url: string
    qs?: any
    body?: any
  }
  error?: Error
}

export class ApiError extends Error {
  public name = 'ApiError'

  constructor(
    public message: string,
    public details: ApiErrorDetails,
  ) {
    super(message)
  }
}

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'

export class BaseApiClient {
  private axiosInstance: AxiosInstance
  private headers: any | undefined

  readonly baseUrl: string

  constructor({baseUrl, headers}: {baseUrl: string; headers?: any}) {
    this.baseUrl = baseUrl
    this.headers = headers
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {...headers},
    })
  }

  readonly get = <T = any>(uri: string, options?: RequestOptions): Promise<T> => {
    return this.doRequest('GET', uri, options)
  }

  readonly post = <T = any>(uri: string, options?: RequestOptions): Promise<T> => {
    return this.doRequest('POST', uri, options)
  }

  private async doRequest(method: Method, url: string, options?: RequestOptions) {
    const builtOptions = {
      ...options,
      headers: {...this.headers, ...options?.headers},
    }
    return this.axiosInstance
      .request({
        method,
        url,
        headers: builtOptions?.headers,
        params: options?.qs,
        data: options?.body,
        paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'}),
      })
      .then((_: AxiosResponse) => _.data)
      .catch((_: any) => {
        console.log(_)
        const request = {method, url, qs: options?.qs, body: options?.body}
        if (_.response && _.response.data) {
          const message = _.response.data.details ?? _.response.data.timeout ?? JSON.stringify(_.response.data)
          throw new ApiError(message, {
            code: _.response.status,
            id: _.response.data.type,
            request,
            error: _,
          })
        } else if (_.code === 'ERR_NETWORK') {
          throw new ApiError(`SignalConso est inaccessible, veuillez vérifier votre connexion.`, {
            code: 'front-side',
            error: _,
            request,
          })
        }
        throw new ApiError(`Something not caught went wrong`, {
          code: 'front-side',
          error: _,
          request,
        })
      })
  }
}
