import axios, {AxiosInstance, AxiosResponse, ResponseType, isAxiosError, AxiosProgressEvent, GenericAbortSignal} from 'axios'
import * as qs from 'qs'

interface RequestOptions {
  // all these could probably be typed better
  readonly qs?: any
  readonly headers?: any
  readonly body?: any
  readonly timeout?: number
  readonly responseType?: ResponseType
  readonly onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  readonly signal?: GenericAbortSignal
}

interface ApiErrorDetails {
  // 300, 404, 500, etc.
  code?: number | undefined
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
        onUploadProgress: builtOptions.onUploadProgress,
        signal: builtOptions.signal,
      })
      .then((_: AxiosResponse) => _.data)
      .catch((_: any) => {
        const request = {method, url, qs: options?.qs, body: options?.body}
        if (_.response && _.response.data) {
          // here we're reading the error structure often sent by the API
          // but not always ! the api is inconsistent (plus we have multiple apis now...)
          const message = _.response.data.details ?? _.response.data.timeout ?? JSON.stringify(_.response.data)
          throw new ApiError(message, {
            code: _.response.status,
            id: _.response.data.type,
            request,
            error: _,
          })
        } else if (isAxiosError(_)) {
          if (_.code === 'ERR_NETWORK') {
            throw new ApiError(`SignalConso est inaccessible, veuillez vérifier votre connexion.`, {
              error: _,
              request,
            })
          } else {
            // Fallback for a general HTTP error with a status code
            const status = _.response?.status
            if (status !== undefined) {
              const statusText = _.response?.statusText
              throw new ApiError(`Http error ${status} ${statusText}`, {
                code: status,
                error: _,
                request,
              })
            }
            // Then fallback to the very general error
          }
        }
        throw new ApiError(`Something not caught went wrong`, {
          error: _,
          request,
        })
      })
  }
}
