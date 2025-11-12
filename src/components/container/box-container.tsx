import {
    Box,
    type BoxProps,
} from '@chakra-ui/react';

interface BoxContainerProps extends BoxProps {
    fullHeight?: boolean;
}

function BoxContainer({ fullHeight, children, ...others }: BoxContainerProps) {
    return (
        <Box
            height={fullHeight ? "100%" : "auto"}
            {...others}
        >
            {children}
        </Box>
    );
}

export { BoxContainer };
export type { BoxContainerProps };
export default BoxContainer;