import { useNavigator } from "@shared/router/hooks/navigator";

import type { Publisher } from "@features/publisher/types/publisher";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useListPublishers } from "@features/publisher/hooks/list-publishers";
import { PublisherTable } from "@features/publisher/components/publisher-table";

import { useAlert } from "@components/feedback/use-alert";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { AddIcon } from "@shared/icons";
import { EmptyList } from "@/layout/empty-list";
import { ListSkeleton } from "@/layout/list-skeleton";
import { ListError } from "@/layout/list-error";
import { LoadingBoundary } from "@/layout/loading-boundary";

export function ListPublisherPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const publishers = useListPublishers();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = usePublisherService();

    const handleCreate = (): void => {
        navigate.to("/app/publisher/form");
    };

    const handleUpdate = (entity: Publisher): void => {
        navigate.to(`/app/publisher/form/${entity.id}`);
    };

    const handleRemove = (entity: Publisher): void => {
        service.delete(entity)
            .then(() => {
                publishers.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        publishers.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Publisher"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LoadingBoundary.Root loader={publishers.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(publishers.data.length > 0) && (
                            <PublisherTable
                                data={publishers.data}
                                pagination={publishers.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(publishers.data?.length === 0) && (
                            <EmptyList />
                        )}
                    </LoadingBoundary.SuccessState>

                    <LoadingBoundary.ErrorState>
                        <ListError />
                    </LoadingBoundary.ErrorState>
                </LoadingBoundary.Root>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListPublisherPage;
