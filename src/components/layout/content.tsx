import BoxContainer from "@/components/container/box-container";
import type { Authorization } from "@/features/auth/hooks/use-authorization-filter";
import ForbiddenContent from "@/fragments/content-not-allowed";

export interface ApplicationContentProps extends React.PropsWithChildren {
    authorization?: Authorization;
}

export function ApplicationContent({ children, authorization }: ApplicationContentProps) {
    if (authorization && !authorization.permitted) {
        return <ForbiddenContent />;
    }

    return (
        <BoxContainer padding="8" overflow="auto" flexGrow={1}>
            {children}
        </BoxContainer>
    );
}

export default ApplicationContent;
