import type { Token } from "@/features/auth/types/token.js";
import type { LoggedUser } from "@/features/user/types/logged-user";

export interface Authentication {
    token: Token;
    loggedUser: LoggedUser;
}