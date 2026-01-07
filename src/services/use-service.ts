import NativeHttpClient from "@/common/native.http-client";
import type { HttpClient } from "@/common/http-client";
import Environment from "@/config/environment";

interface ServiceClassConstructor<Service> {
    new(httpClient: HttpClient): Service;
}

interface ServiceClassOptions {
    includeAuthorization?: boolean;
}

export function useService<Service>(ServiceClass: ServiceClassConstructor<Service>, options?: ServiceClassOptions): Service {
    const headers = {};

    if (options?.includeAuthorization) {
        Object.assign(headers, { "Authorization": `Bearer ${localStorage.getItem("token") ?? ""}` });
    }

    return new ServiceClass(
        new NativeHttpClient(
            Environment.API_URL ?? "",
            headers
        )
    );
}

export default useService;