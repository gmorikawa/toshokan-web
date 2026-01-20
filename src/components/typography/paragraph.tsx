import { Text, type TextProps } from "@chakra-ui/react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type Align = "left" | "center" | "right" | "justify";

export interface ParagraphProps extends TextProps {
    size?: Size;
    align?: Align;
}

export function Paragraph({ size, align, children, ...props }: ParagraphProps) {
    return (
        <Text
            textStyle={size ?? "md"}
            textAlign={align ?? "left"}
            {...props}
        >
            {children}
        </Text>
    );
}

export default Paragraph;