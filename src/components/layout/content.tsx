import BoxContainer from "@/components/container/box-container";

export interface ApplicationContentProps extends React.PropsWithChildren { }

export function ApplicationContent({ children }: ApplicationContentProps) {
    return (
        <BoxContainer padding="8" overflow="auto">
            {children}
        </BoxContainer>
    );
}

export default ApplicationContent;
