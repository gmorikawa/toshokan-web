import { Stack, type StackProps } from '@chakra-ui/react';

export interface StackContainerProps extends React.ComponentPropsWithRef<React.ElementType>, StackProps {
    spacing?: number;
    fullHeight?: boolean;
}

export function StackContainer({ spacing, fullHeight, children, ref, ...props }: StackContainerProps) {
    return (
        <Stack
            gap={spacing ?? 0}
            height={fullHeight ? "100%" : "auto"}
            ref={ref}
            {...props}
        >
            {children}
        </Stack>
    );
}
