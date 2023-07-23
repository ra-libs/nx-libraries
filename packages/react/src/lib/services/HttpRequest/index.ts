import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export class HttpRequest {
  static async get<T = any>(URL: string, options: AxiosRequestConfig = {}) {
    return HttpRequest.request<T>(URL, 'get', options)
  }

  static async post<T = any>(URL: string, body: any = {}, options: AxiosRequestConfig = {}) {
    return HttpRequest.request<T>(URL, 'post', {
      data: body,
      ...options,
    })
  }

  static async put<T = any>(URL: string, body: any = {}, options: AxiosRequestConfig = {}) {
    return HttpRequest.request<T>(URL, 'put', {
      data: body,
      ...options,
    })
  }

  static async delete<T = any>(URL: string, options: AxiosRequestConfig = {}) {
    return HttpRequest.request<T>(URL, 'delete', options)
  }

  static async request<T = any>(
    URL: string,
    method: string,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any>> {
    try {
      const response = await axios.request({
        url: URL,
        method,
        ...options,
      })
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
