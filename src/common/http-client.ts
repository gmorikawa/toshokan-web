export type RequestContentType = "json" | "form-data";

export interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string>;
}

export interface RequestOptionsWithBody extends RequestOptions {
    contentType?: RequestContentType;
    body?: unknown;
}

export interface HttpClient {
    get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
    post<T>(endpoint: string, options?: RequestOptionsWithBody): Promise<T>;
    put<T>(endpoint: string, options?: RequestOptionsWithBody): Promise<T>;
    patch<T>(endpoint: string, options?: RequestOptionsWithBody): Promise<T>
    delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
