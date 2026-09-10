export class HttpClient {
  get<T>(url: string, query?: Record<string, unknown>): Promise<T> {
    return $fetch(url, { query });
  }
}

export const httpClient = new HttpClient();
