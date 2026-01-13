import { useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { Session } from "@features/auth/types/session";
import type { Token } from "@features/auth/types/token";
import type { LoggedUser } from "@features/user/types/logged-user";
import { UserSessionContext } from "@features/auth/hooks/session";

export interface UserSessionProviderProps {
    children: React.ReactNode;
}

export function UserSessionProvider({ children }: UserSessionProviderProps) {
    const [session, setSession] = useState<Nullable<Session>>(() => {
        const token = window.localStorage.getItem("token") || null;
        const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser") || "null");

        return { token, loggedUser };
    });

    const update = (token: Token, loggedUser: LoggedUser) => {
        window.localStorage.setItem("token", token ?? "");
        window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser ?? {}));
        setSession({ token, loggedUser });
    };

    const reset = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("loggedUser");
        setSession(null);
    };

    return (
        <UserSessionContext.Provider value={{ session, update, reset }}>
            {children}
        </UserSessionContext.Provider>
    );
}
