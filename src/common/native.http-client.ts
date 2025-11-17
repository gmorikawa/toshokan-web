import type { RequestContentType, HttpClient, RequestOptions, RequestOptionsWithBody } from "./http-client";

class NativeHttpClient implements HttpClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseUrl: string = "", defaultHeaders: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    private async request<T>(
        method: string,
        endpoint: string,
        options: RequestOptionsWithBody
    ): Promise<T> {
        const url = new URL(endpoint, this.baseUrl);

        const jsonSerializer = (data: unknown) => JSON.stringify(data);
        const formDataSerializer = (data: Record<string, any>) => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            return formData;
        };
        const serializers = (data: unknown, contentType: RequestContentType) => {
            switch (contentType) {
                case "json":
                    return jsonSerializer(data);
                case "form-data":
                    return formDataSerializer(data as Record<string, any>);
                default:
                    return jsonSerializer(data);
            }
        };

        // Add query parameters
        Object.entries(options?.params ?? {}).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        const contentTypeHeader: Record<string, string> = options?.contentType === "form-data"
            ? {}
            : { "Content-Type": "application/json" };

        try {
            const response = await fetch(url.toString(), {
                method,
                headers: {
                    ...this.defaultHeaders,
                    ...options?.headers,
                    ...contentTypeHeader,
                },
                ...(options?.body ? { body: serializers(options?.body, options?.contentType ?? "json") } : {}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the response has content before parsing JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }

            if (contentType && contentType.includes("application/octet-stream")) {
                return response.blob() as unknown as T;
            }

            return response.text() as T;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch: ${error.message}`);
            }
            throw new Error("An unknown error occurred");
        }
    }

    async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>("GET", endpoint, options);
    }

    async post<T>(endpoint: string, options: RequestOptionsWithBody = {}): Promise<T> {
        return this.request<T>("POST", endpoint, options);
    }

    async put<T>(endpoint: string, options: RequestOptionsWithBody = {}): Promise<T> {
        return this.request<T>("PUT", endpoint, options);
    }

    async patch<T>(endpoint: string, options: RequestOptionsWithBody = {}): Promise<T> {
        return this.request<T>("PATCH", endpoint, options);
    }

    async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>("DELETE", endpoint, options);
    }
}

export { NativeHttpClient };
export default NativeHttpClient;