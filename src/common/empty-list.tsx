import BoxContainer from "@/components/container/box-container";
import CentralizedContainer from "@/components/container/centralized-container";

import { EmptyState, VStack } from "@chakra-ui/react"
import { NotFoundIcon } from "../common/icons";

export interface EmptyListProps { }

export function EmptyList({}: EmptyListProps) {
    return (
        <BoxContainer fullHeight>
            <CentralizedContainer height="40%">
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <NotFoundIcon />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>No data</EmptyState.Title>
                            <EmptyState.Description>
                                Register data by clicking the new button.
                            </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            </CentralizedContainer>
        </BoxContainer>
    );
}

export default EmptyList;