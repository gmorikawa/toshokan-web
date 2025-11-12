import {
    Box,
} from '@chakra-ui/react';

interface ViewportContainerProps extends React.ComponentPropsWithRef<React.ElementType> {}

function ViewportContainer({ children, ref }: ViewportContainerProps) {
    return (
        <Box height="100vh" position="relative" overflow="hidden" ref={ref}>
            {children}
        </Box>
    );
}

export { ViewportContainer };
export type { ViewportContainerProps };
export default ViewportContainer;