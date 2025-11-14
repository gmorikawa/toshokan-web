import {
    Stack,
} from '@chakra-ui/react';

interface StackContainerProps extends React.ComponentPropsWithRef<React.ElementType> {
    spacing?: number;
    fullHeight?: boolean;
}

function StackContainer({ spacing, fullHeight, children, ref }: StackContainerProps) {
    return (
        <Stack
            gap={spacing ?? 0}
            height={fullHeight ? "100%" : "auto"}
            ref={ref}
        >
            {children}
        </Stack>
    );
}

export { StackContainer };
export type { StackContainerProps };
export default StackContainer;