import {
    Stack,
} from '@chakra-ui/react';

interface StackContainerProps extends React.PropsWithChildren {
    spacing: number;
}

function StackContainer({ spacing, children }: StackContainerProps) {
    return (
        <Stack gap={spacing}>
            {children}
        </Stack>
    );
}

export { StackContainer };
export type { StackContainerProps };
export default StackContainer;