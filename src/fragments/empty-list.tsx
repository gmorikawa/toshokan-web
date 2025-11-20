import BoxContainer from "@/components/container/box-container";
import CentralizedContainer from "@/components/container/centralized-container";

import { EmptyState, VStack } from "@chakra-ui/react"
import { NotFoundIcon } from "./icons";

export interface EmptyListProps {
    shouldRender?: boolean;
}

export function EmptyList({ shouldRender }: EmptyListProps) {
    return shouldRender && (
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