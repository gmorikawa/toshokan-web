import BoxContainer from "@/components/container/box-container";
import CentralizedContainer from "@/components/container/centralized-container";

import { EmptyState, VStack } from "@chakra-ui/react"
import { ForbiddenIcon } from "../common/icons";

export function ForbiddenContent() {
    return (
        <BoxContainer fullHeight>
            <CentralizedContainer height="40%">
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <ForbiddenIcon />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>Forbidden</EmptyState.Title>
                            <EmptyState.Description>
                                You do not have permission to access this content.
                            </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            </CentralizedContainer>
        </BoxContainer>
    );
}

export default ForbiddenContent;