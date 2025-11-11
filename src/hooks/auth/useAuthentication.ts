import type { AuthenticationToken } from "@/entities/authentication-token";

import NativeHttpClient from "@/common/native.http-client";
import AuthService from "@/services/auth-service";
import useLocalStorage from "@/hooks/storage/useLocalStorage";

interface UseAuthentication {
    login(username: string, password: string): Promise<void>;
}

function useAuthentication(): UseAuthentication {
    const baseUrl = import.meta.env.VITE_API_URL ?? "";
    const storage = useLocalStorage();
    const httpClient = new NativeHttpClient(baseUrl);
    const authService = new AuthService(httpClient);

    const login = async (username: string, password: string): Promise<void> => {
        return authService.login(username, password)
            .then((data: AuthenticationToken) => {
                if (data.accessToken) {
                    storage.set("token", data.accessToken);
                } else {
                    throw new Error("Authentication | Access Token is null.")
                }
            });
    };

    return {
        login
    };
}

export type { UseAuthentication };
export { useAuthentication };
export default useAuthentication;