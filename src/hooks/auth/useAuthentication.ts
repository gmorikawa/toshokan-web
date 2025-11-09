import { useState } from "react";

import NativeHttpClient from "@/common/native.http-client";
import AuthService from "@/services/auth-service";
import type { AuthenticationToken } from "@/entities/authentication-token";
import useCookies from "../storage/useCookies";

interface UseAuthentication {
    username: string;
    password: string;

    updateUsername(username: string): void;
    updatePassword(password: string): void;

    login(): Promise<void>;
}

function useAuthentication(): UseAuthentication {
    const baseUrl = import.meta.env.VITE_API_URL ?? "";
    const httpClient = new NativeHttpClient(baseUrl);
    const authService = new AuthService(httpClient);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const cookies = useCookies();

    const updateUsername = (username: string) => {
        setUsername(username);
    };

    const updatePassword = (password: string) => {
        setPassword(password);
    };

    const login = async (): Promise<void> => {
        return authService.login(username, password)
            .then((data: AuthenticationToken) => {
                if (data.accessToken) {
                    cookies.set("token", data.accessToken);
                } else {
                    throw new Error("Authentication | Access Token is null.")
                }
            });
    };

    return {
        username,
        password,
        updateUsername,
        updatePassword,
        login
    };
}

export type { UseAuthentication };
export { useAuthentication };
export default useAuthentication;