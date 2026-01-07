import type { Token } from "@features/auth/types/token";
import type { LoggedUser } from "@features/user/types/logged-user";

export interface Session {
    loggedUser: LoggedUser | null;
    token: Token
}