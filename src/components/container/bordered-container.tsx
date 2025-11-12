import {
    Box,
} from '@chakra-ui/react';

interface BorderedContainerProps extends React.PropsWithChildren {
    width?: string;
    fullHeight?: boolean;
    padding?: number;
}

function BorderedContainer({ width, fullHeight, padding, children }: BorderedContainerProps) {
    const borderColor = 'gray.200';
    const bgColor = 'white';

    return (
        <Box
            w={width ?? "full"}
            p={padding ?? 8}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            bg={bgColor}
            height={fullHeight ? "100%" : "auto"}
        >
            {children}
        </Box>
    );
}

export { BorderedContainer };
export type { BorderedContainerProps };
export default BorderedContainer;