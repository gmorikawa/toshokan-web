import { Heading as ChakraHeading } from "@chakra-ui/react"

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.PropsWithChildren {
    size?: Size;
    level?: Level;
}

export function Heading({ size, level, children }: HeadingProps) {
    return (
        <ChakraHeading size={size ?? "md"} as={`h${level ?? 2}`}>
            {children}
        </ChakraHeading>
    );
}
