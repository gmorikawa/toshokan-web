import type { Authentication } from "@features/auth/types/authentication";
import { useSession, type SessionController } from "@features/auth/hooks/session";
import { loginRequest } from "@features/auth/utils/api";

export interface AuthenticationController {
    session: SessionController;

    login: (username: string, password: string) => Promise<Authentication>;
    logout: () => void;
}

export function useAuthentication(): AuthenticationController {
    const session = useSession();

    const login = async (username: string, password: string) => {
        return loginRequest(username, password)
            .then(async (authentication: Authentication) => {
                session.update(authentication.token, authentication.loggedUser);

                return authentication;
            });
    };

    const logout = () => {
        session.reset();
    };

    return { session, login, logout };
}
