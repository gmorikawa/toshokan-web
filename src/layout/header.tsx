import BoxContainer from "@/components/container/box-container";
import Heading from "@/components/typography/header-typography";
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
                <Heading size="2xl" level={1}>
                    {title}
                </Heading>

                <BoxContainer>
                    {actionSlot}
                </BoxContainer>

            </BoxContainer>

            {children}
        </BoxContainer>
    );
}

export default ApplicationHeader;