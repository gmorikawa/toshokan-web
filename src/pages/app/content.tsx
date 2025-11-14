import BoxContainer from "@/components/container/box-container";

export interface ApplicationContentProps extends React.PropsWithChildren { }

export function ApplicationContent({ children }: ApplicationContentProps) {
    return (
        <BoxContainer padding="8">
            {children}
        </BoxContainer>
    );
}

export default ApplicationContent;
