import type { UserRole } from "@features/user/types/enums";
import { useSession } from "@features/auth/hooks/session";

export interface RestrictedContentProps extends React.PropsWithChildren {
    allowedRoles: UserRole[];
}

export function RestrictedContent({ allowedRoles, children }: RestrictedContentProps) {
    const { session } = useSession();

    if (!session || !session.loggedUser) {
        throw new Error("No session available");
    }

    return (!session.loggedUser || !allowedRoles.includes(session.loggedUser.role))
        ? null
        : children;
}

export default RestrictedContent;