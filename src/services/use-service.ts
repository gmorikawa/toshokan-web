import NativeHttpClient from "@/common/native.http-client";
import useLocalStorage from "../hooks/storage/use-local-storage";
import type { HttpClient } from "@/common/http-client";

interface ServiceClassConstructor<Service> {
    new(httpClient: HttpClient): Service;
}

interface ServiceClassOptions {
    includeAuthorization?: boolean;
}

export function useService<Service>(ServiceClass: ServiceClassConstructor<Service>, options?: ServiceClassOptions): Service {
    const storage = useLocalStorage();

    const headers = {};

    if (options?.includeAuthorization) {
        Object.assign(headers, { "Authorization": `Bearer ${storage.get("token") ?? ""}` });
    }

    return new ServiceClass(
        new NativeHttpClient(
            import.meta.env.VITE_API_URL ?? "",
            headers
        )
    );
}

export default useService;