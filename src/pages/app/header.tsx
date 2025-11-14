import BoxContainer from "@/components/container/box-container";
import HeaderTypography from "@/components/typography/header-typography";

export interface ApplicationHeaderProps {
    title: string;

    actionSlot?: React.ReactNode;
}

export function ApplicationHeader({ title, actionSlot }: ApplicationHeaderProps) {
    return (
        <BoxContainer
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
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
        </BoxContainer>
    );
}

export default ApplicationHeader;