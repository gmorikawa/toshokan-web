import { Heading } from "@chakra-ui/react"

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

export interface HeaderTypographyProps extends React.PropsWithChildren {
    size?: Size;
}

export function HeaderTypography({ size, children }: HeaderTypographyProps) {
    return (
        <Heading size={size ?? "md"}>
            {children}
        </Heading>
    );
}

export default HeaderTypography;