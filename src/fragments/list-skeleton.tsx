import { Skeleton, Stack } from "@chakra-ui/react";

export function ListSkeleton() {
    return (
        <Stack gap={4} height="full" id="tetse">
            <Skeleton height="36px" />
            <Skeleton height="60%" />
        </Stack>
    )
};

export default ListSkeleton;