import { Text } from "@chakra-ui/react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

export interface ParagraphProps extends React.PropsWithChildren {
    size?: Size;
}

export function Paragraph({ size, children }: ParagraphProps) {
    return (
        <Text textStyle={size ?? "md"}>
            {children}
        </Text>
    );
}

export default Paragraph;