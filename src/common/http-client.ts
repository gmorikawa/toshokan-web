interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string>;
}

interface RequestOptionsWithBody extends RequestOptions {
    body?: unknown;
}

interface HttpClient {
    get<T>(endpoint: string, options: RequestOptions): Promise<T>;
    post<T>(endpoint: string, options: RequestOptionsWithBody): Promise<T>;
    put<T>(endpoint: string, options: RequestOptionsWithBody): Promise<T>;
    patch<T>(endpoint: string, options: RequestOptionsWithBody): Promise<T>
    delete<T>(endpoint: string, options: RequestOptions): Promise<T>;
}

export type { HttpClient, RequestOptions, RequestOptionsWithBody };