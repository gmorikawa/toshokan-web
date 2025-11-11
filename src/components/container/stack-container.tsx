import {
    Stack,
} from '@chakra-ui/react';

interface StackContainerProps extends React.ComponentPropsWithRef<React.ElementType> {
    spacing: number;
}

function StackContainer({ spacing, children, ref }: StackContainerProps) {
    return (
        <Stack gap={spacing} ref={ref}>
            {children}
        </Stack>
    );
}

export { StackContainer };
export type { StackContainerProps };
export default StackContainer;