import { createContext, useContext } from "react";

import type { Token } from "@features/auth/types/token";
import type { LoggedUser } from "@features/user/types/logged-user";
import type { Nullable } from "@shared/object/types/nullable";

export interface SessionController {
    token: Nullable<Token>;
    loggedUser: Nullable<LoggedUser>;

    update: (token: Token, loggedUser: LoggedUser) => void;
    reset: () => void;
}

export const UserSessionContext = createContext<SessionController>({
    token: null,
    loggedUser: null,
    update: () => { },
    reset: () => { }
});

export function useSession(): SessionController {
    return useContext(UserSessionContext);
}