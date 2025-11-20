import {
    AbsoluteCenter,
    Box
} from '@chakra-ui/react';

export interface CentralizedContainerProps extends React.PropsWithChildren {
    height: string | number;
}

export function CentralizedContainer({ height, children }: CentralizedContainerProps) {

    return (
        <Box position="relative" height={height}>
            <AbsoluteCenter>
                {children}
            </AbsoluteCenter>
        </Box>
    );
}

export default CentralizedContainer;