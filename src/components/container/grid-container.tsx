import {
    Box,
} from '@chakra-ui/react';

interface GridContainerProps extends React.ComponentPropsWithRef<React.ElementType> {}

function GridContainer({ children, ref }: GridContainerProps) {
    return (
        <Box height="100%" display="grid" ref={ref}>
            {children}
        </Box>
    );
}

export { GridContainer };
export type { GridContainerProps };
export default GridContainer;