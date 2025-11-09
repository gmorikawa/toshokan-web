import type { HttpClient, RequestOptions, RequestOptionsWithBody } from "./http-client";

class NativeHttpClient implements HttpClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseUrl: string = '', defaultHeaders: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders,
        };
    }

    private async request<T>(
        method: string,
        endpoint: string,
        options: RequestOptionsWithBody = {}
    ): Promise<T> {
        const { headers = {}, params = {}, body } = options;
        const url = new URL(endpoint, this.baseUrl);

        // Add query parameters
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        try {
            const response = await fetch(url.toString(), {
                method,
                headers: {
                    ...this.defaultHeaders,
                    ...headers,
                },
                ...(body ? { body: JSON.stringify(body) } : {}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the response has content before parsing JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }

            return response.text() as T;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch: ${error.message}`);
            }
            throw new Error('An unknown error occurred');
        }
    }

    async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>('GET', endpoint, options);
    }

    async post<T>(endpoint: string, options: RequestOptionsWithBody = {}): Promise<T> {
        return this.request<T>('POST', endpoint, options);
    }

    async put<T>(endpoint: string, options: RequestOptionsWithBody = {}): Promise<T> {
        return this.request<T>('PUT', endpoint, options);
    }

    async patch<T>(endpoint: string, options: RequestOptionsWithBody = {}): Promise<T> {
        return this.request<T>('PATCH', endpoint, options);
    }

    async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>('DELETE', endpoint, options);
    }
}

export { NativeHttpClient };
export default NativeHttpClient;