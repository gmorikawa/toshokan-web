import { BoxContainer, type BoxContainerProps } from "@components/container/box-container";
import { StackContainer } from "@components/container/stack-container";
import { Heading } from "@components/typography/heading";

export interface FormSectionProps extends BoxContainerProps {
    title: string;
    subtitleSlot?: React.ReactNode;
}

export function FormSection({ title, subtitleSlot, children, ...props }: FormSectionProps) {
    return (
        <BoxContainer {...props}>
            <StackContainer spacing={1} marginBottom={4}>
                <Heading level={5} size="xl">{title}</Heading>

                {(subtitleSlot) && (
                    <BoxContainer>
                        {subtitleSlot}
                    </BoxContainer>
                )}
            </StackContainer>

            {children}
        </BoxContainer>
    );
}