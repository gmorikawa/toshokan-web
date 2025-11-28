import { Badge as ChakraBadge } from "@chakra-ui/react";
import type { ThemeProps } from "..";

type Variant = "outline" | "solid" | "subtle" | "surface";

export interface BadgeProps extends ThemeProps {
    variant?: Variant;
    children?: string;
}

export function Badge({ variant, palette, children }: BadgeProps) {
    return (
        <ChakraBadge
            colorPalette={palette ?? "primary"}
            variant={variant ?? "subtle"}
        >
            {children}
        </ChakraBadge>
    );
}

export default Badge;