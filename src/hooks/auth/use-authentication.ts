import type { User } from "@/entities/models/user";
import type { AuthenticationToken } from "@/entities/authentication-token";

import NativeHttpClient from "@/common/native.http-client";
import AuthService from "@/services/auth-service";
import useLocalStorage from "@/hooks/storage/use-local-storage";
import Environment from "@/config/environment";
import useRouter from "../router/use-router";
import { useEffect, useState } from "react";

interface UseAuthentication {
    loggedUser: User | null;
    login(username: string, password: string): Promise<void>;
    logout(): void;
}

function useAuthentication(): UseAuthentication {
    const baseUrl = Environment.API_URL ?? "";
    const router = useRouter();
    const storage = useLocalStorage();
    const httpClient = new NativeHttpClient(baseUrl);
    const authService = new AuthService(httpClient);

    const [loggedUser, setLoggedUser] = useState<User | null>(null);

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

    const logout = (): void => {
        storage.set("token", null);
        router.navigateTo("/login");
    }

    useEffect(() => {
        const token = storage.get("token");
        if (token) {
            authService.getLoggedUser(token)
                .then((user: User) => {
                    setLoggedUser(user);
                })
                .catch(() => {
                    setLoggedUser(null);
                    logout();
                });
        }
    }, []);
    return {
        loggedUser,
        login,
        logout
    };
}

export type { UseAuthentication };
export { useAuthentication };
export default useAuthentication;