import type { Publisher } from "@/types/models/publisher";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { AddIcon } from "@/common/icons";
import EmptyList from "@/common/empty-list";
import ListSkeleton from "@/common/list-skeleton";
import ListError from "@/common/list-error";
import LoadingBoundary from "@/common/loading-boundary";
import useListPublishers from "@/features/publisher/hooks/use-list-publishers";
import PublisherTable from "@/features/publisher/components/publisher-table";

import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function ListPublisherPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const publishers = useListPublishers();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/publisher/form");
    };

    const handleUpdate = (entity: Publisher): void => {
        router.navigateTo(`/app/publisher/form/${entity.id}`);
    };

    const handleRemove = (entity: Publisher): void => {
        service.remove(entity)
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
