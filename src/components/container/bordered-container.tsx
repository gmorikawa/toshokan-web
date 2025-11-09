import {
    Box,
} from '@chakra-ui/react';

interface BorderedContainerProps extends React.PropsWithChildren {
    width?: string;
}

function BorderedContainer({ width, children }: BorderedContainerProps) {
    const borderColor = 'gray.200';
    const bgColor = 'white';

    return (
        <Box
            w={width ?? "full"}
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            bg={bgColor}
        >
            {children}
        </Box>
    );
}

export { BorderedContainer };
export type { BorderedContainerProps };
export default BorderedContainer;