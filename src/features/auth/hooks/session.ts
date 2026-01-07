import { createContext, useContext } from "react";

import type { Token } from "@features/auth/types/token";
import type { Session } from "@features/auth/types/session";
import type { LoggedUser } from "@features/user/types/logged-user";

export interface SessionController extends Session {
    update: (token: Token, loggedUser: LoggedUser) => void;
    reset: () => void;
}

export const UserSessionContext = createContext<SessionController>({
    token: "",
    loggedUser: null,
    update: () => { },
    reset: () => { }
});

export function useSession(): SessionController {
    return useContext(UserSessionContext);
}