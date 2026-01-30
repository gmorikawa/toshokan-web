import type { Authorization } from "@features/auth/hooks/authorization";
import { ForbiddenContent } from "@features/auth/components/content-not-allowed";

import { BoxContainer } from "@components/container/box-container";

export interface ApplicationContentProps extends React.PropsWithChildren {
    authorization?: Authorization;

    removePadding?: boolean;
}

export function ApplicationContent({ authorization, removePadding, children }: ApplicationContentProps) {
    return ((authorization && !authorization.permitted))
        ? (<ForbiddenContent />)
        : (
            <BoxContainer
                padding={removePadding ? undefined : "8"}
                overflow="auto"
                flexGrow={1}
                fullHeight
            >
                {children}
            </BoxContainer>
        );
}
