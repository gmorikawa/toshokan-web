import {
    Box,
} from '@chakra-ui/react';

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type JustifyContent = "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" | "normal" | "space-between" | "space-around" | "space-evenly" | "stretch";
type AlignItems = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "self-start" | "self-end" | "anchor-center" | "baseline" | "first baseline" | "last baseline";

interface FlexContainerProps extends React.ComponentPropsWithRef<React.ElementType> {
    spacing?: string;
    fullHeight?: boolean;
    direction?: FlexDirection;
    justify?: JustifyContent;
    align?: AlignItems;
}

function FlexContainer({ spacing, fullHeight, direction, justify, align, children, ref }: FlexContainerProps) {
    return (
        <Box
            display="flex"
            height={fullHeight ? "100%" : "auto"}
            gap={spacing ?? "0"}
            direction={direction ?? "row"}
            justifyContent={justify ?? "flex-start"}
            alignItems={align ?? "flex-start"}
            ref={ref}
        >
            {children}
        </Box>
    );
}

export { FlexContainer };
export type { FlexContainerProps };
export default FlexContainer;