import { createContext, useContext } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { Token } from "@features/auth/types/token";
import type { LoggedUser } from "@features/user/types/logged-user";
import type { Session } from "@features/auth/types/session";

export interface SessionController {
    session: Nullable<Session>;

    update: (token: Token, loggedUser: LoggedUser) => void;
    reset: () => void;
}

export const UserSessionContext = createContext<SessionController>({
    session: null,
    update: () => { },
    reset: () => { }
});

export function useSession(): SessionController {
    return useContext(UserSessionContext);
}
