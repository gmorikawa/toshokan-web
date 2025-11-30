import BoxContainer from "@/components/container/box-container";
import CentralizedContainer from "@/components/container/centralized-container";

import { EmptyState, VStack } from "@chakra-ui/react"
import { WarningIcon } from "../common/icons";

export function ListError() {
    return (
        <BoxContainer fullHeight>
            <CentralizedContainer height="60%">
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <WarningIcon />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>An error occurred</EmptyState.Title>
                            <EmptyState.Description>
                                Try refreshing the page or come back later.
                            </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            </CentralizedContainer>
        </BoxContainer>
    );
}

export default ListError;