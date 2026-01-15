import type { Session } from "@features/auth/types/session";
import { login } from "@features/auth/utils/api";
import { useSession } from "@features/auth/hooks/session";

import { useAlert } from "@components/feedback/alert/controller";
import useNavigator from "@shared/router/hooks/navigator";

export interface AuthenticationController {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export function useAuthentication(): AuthenticationController {
    const navigate = useNavigator();
    const session = useSession();
    const alert = useAlert();

    return {
        login: async (username: string, password: string) => {
            return login(username, password)
                .then(async (userSession: Session) => {
                    session.update(userSession.token, userSession.loggedUser);

                    navigate.to("/app/topic/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        },
        logout: () => {
            session.reset();
            navigate.to("/login");
        },
    }
}
