import type { UserRole } from "@features/user/types/enums";
import { useSession } from "@features/auth/hooks/session";

export interface Authorization {
    permitted: boolean;
    allowedRoles: UserRole[];
}

function isAuthorized(role: UserRole, allowedRoles: UserRole[]): boolean {
    return allowedRoles.includes(role);
}

export function useAuthorization(...allowedRoles: UserRole[]) {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        permitted: isAuthorized(session.loggedUser?.role ?? "READER", allowedRoles),
        allowedRoles,
    }
}

export default useAuthorization;