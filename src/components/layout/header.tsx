import BoxContainer from "@/components/container/box-container";
import HeaderTypography from "@/components/typography/header-typography";
import Environment from "@/config/environment";

export interface ApplicationHeaderProps extends React.PropsWithChildren {
    title: string;

    actionSlot?: React.ReactNode;
}

export function ApplicationHeader({ title, actionSlot, children }: ApplicationHeaderProps) {
    document.title = `${title} - ${Environment.APPLICATION_NAME}`;

    return (
        <BoxContainer
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            position="relative"
        >
            <BoxContainer
                padding="8"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <HeaderTypography size="2xl">
                    {title}
                </HeaderTypography>

                <BoxContainer>
                    {actionSlot}
                </BoxContainer>

            </BoxContainer>

            {children}
        </BoxContainer>
    );
}

export default ApplicationHeader;