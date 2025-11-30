import type { UserRole } from "@/types/models/user";
import useAuthentication from "./use-authentication";

export interface Authorization {
    permitted: boolean;
    allowedRoles: UserRole[];
}

export function useAuthorizationFilter(...allowedRoles: UserRole[]) {
    const authentication = useAuthentication();

    function isAuthorized(role: UserRole, allowedRoles: UserRole[]): boolean {
        return allowedRoles.includes(role);
    }

    return {
        permitted: isAuthorized(authentication.loggedUser?.role ?? "READER", allowedRoles),
        allowedRoles,
    }
}

export default useAuthorizationFilter;