import axios, {AxiosResponse, ResponseType} from 'axios'
import * as qs from 'qs'

export interface RequestOption {
  readonly qs?: any
  readonly headers?: any
  readonly body?: any
  readonly timeout?: number
  readonly responseType?: ResponseType
}

export interface ApiClientParams {
  readonly baseUrl: string
  readonly headers?: any
  readonly requestInterceptor?: (options?: RequestOption) => Promise<RequestOption> | RequestOption
  readonly proxy?: string
  readonly mapData?: (_: any) => any
  readonly mapError?: (_: any) => never
}

export interface ApiClientApi {
  readonly baseUrl: string
  readonly get: <T = any>(uri: string, options?: RequestOption) => Promise<T>
  readonly post: <T = any>(uri: string, options?: RequestOption) => Promise<T>
  readonly postGetPdf: <T = any>(uri: string, options?: RequestOption) => Promise<Blob>
  readonly getPdf: <T = any>(uri: string, options?: RequestOption) => Promise<Blob>
  readonly delete: <T = any>(uri: string, options?: RequestOption) => Promise<T>
  readonly put: <T = any>(uri: string, options?: RequestOption) => Promise<T>
  readonly patch: <T = any>(uri: string, options?: RequestOption) => Promise<T>
}

export type StatusCode = 'front-side' | 200 | 301 | 302 | 400 | 401 | 403 | 404 | 423 | 500 | 504

export interface ApiErrorDetails {
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

  constructor(public message: string, public details: ApiErrorDetails) {
    super(message)
  }
}

export interface ApiDetailedError {
  code: StatusCode
  message: Detail
  error?: Error
}

export interface Detail {
  type: string
  title: string
  details: string
}

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'

export class ApiClient {
  private readonly request: (method: Method, url: string, options?: RequestOption) => Promise<any>

  readonly postGetPdf: (url: string, options?: RequestOption) => Promise<Blob>

  readonly getPdf: (url: string, options?: RequestOption) => Promise<Blob>

  readonly baseUrl: string

  constructor({baseUrl, headers, requestInterceptor, mapData, mapError}: ApiClientParams) {
    const client = axios.create({
      baseURL: baseUrl,
      headers: {...headers},
    })

    this.baseUrl = baseUrl

    this.request = async (method: Method, url: string, options?: RequestOption) => {
      const builtOptions = await ApiClient.buildOptions(options, headers, requestInterceptor)
      return client
        .request({
          method,
          url,
          headers: builtOptions?.headers,
          params: options?.qs,
          data: options?.body,
          paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'}),
        })
        .then(mapData ?? ((_: AxiosResponse) => _.data))
        .catch(
          mapError ??
            ((_: any) => {
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
              }
              throw new ApiError(`Something not caught went wrong`, {
                code: 'front-side',
                error: _,
                request,
              })
            }),
        )
    }

    /**
     * TODO(Alex) Didn't find any way to download pdf with axios so I did it using fetch(), but it should exist.
     */
    const requestUsingFetchApi = async (method: Method, url: string, options?: RequestOption) => {
      const builtOptions = await ApiClient.buildOptions(options, headers, requestInterceptor)
      return fetch(baseUrl + url + (options?.qs ? `?${qs.stringify(options.qs, {arrayFormat: 'repeat'})}` : ''), {
        method,
        headers: builtOptions?.headers,
        body: builtOptions.body ? JSON.stringify(builtOptions?.body) : undefined,
      })
    }

    this.postGetPdf = async (url: string, options?: RequestOption) => {
      return requestUsingFetchApi('POST', url, options).then(_ => _.blob())
    }

    this.getPdf = async (url: string, options?: RequestOption) => {
      return requestUsingFetchApi('GET', url, options).then(_ => _.blob())
    }
  }

  private static readonly buildOptions = async (
    options?: RequestOption,
    headers?: any,
    requestInterceptor: (_?: RequestOption) => RequestOption | Promise<RequestOption> = _ => _!,
  ): Promise<RequestOption> => {
    const interceptedOptions = await requestInterceptor(options)
    return {
      ...interceptedOptions,
      headers: {...headers, ...interceptedOptions?.headers},
    }
  }

  readonly get = <T = any>(uri: string, options?: RequestOption): Promise<T> => {
    return this.request('GET', uri, options)
  }

  readonly post = <T = any>(uri: string, options?: RequestOption): Promise<T> => {
    return this.request('POST', uri, options)
  }

  readonly delete = <T = any>(uri: string, options?: RequestOption): Promise<T> => {
    return this.request('DELETE', uri, options)
  }

  readonly put = <T = any>(uri: string, options?: RequestOption): Promise<T> => {
    return this.request('PUT', uri, options)
  }

  readonly patch = <T = any>(uri: string, options?: RequestOption): Promise<T> => {
    return this.request('PATCH', uri, options)
  }
}
