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

    const buildHttpClient = () => {
        if (options?.includeAuthorization) {
            return new NativeHttpClient(
                import.meta.env.VITE_API_URL ?? "",
                {
                    "Authorization": `Bearer ${storage.get("token") ?? ""}`,
                }
            );
        } else {
            return new NativeHttpClient(
                import.meta.env.VITE_API_URL ?? "",
            );
        }
    };

    return new ServiceClass(buildHttpClient());
}

export default useService;