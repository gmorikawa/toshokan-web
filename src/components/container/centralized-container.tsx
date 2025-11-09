import {
    AbsoluteCenter,
    Box
} from '@chakra-ui/react';

interface CentralizedContainerProps extends React.PropsWithChildren {
    parentHeight: string;
}

function CentralizedContainer({ parentHeight, children }: CentralizedContainerProps) {

    return (
        <Box position="relative" height={parentHeight}>
            <AbsoluteCenter>
                {children}
            </AbsoluteCenter>
        </Box>
    );
}

export { CentralizedContainer };
export type { CentralizedContainerProps };
export default CentralizedContainer;