import type { UserRole } from "@/types/models/user";
import useAuthentication from "../hooks/use-authentication";

export interface RestrictedContentProps extends React.PropsWithChildren {
    allowedRoles: UserRole[];
}

export function RestrictedContent({ allowedRoles, children }: RestrictedContentProps) {
    const auth = useAuthentication();

    return (!auth.loggedUser || !allowedRoles.includes(auth.loggedUser.role))
        ? null
        : children;
}

export default RestrictedContent;