import type { Publisher } from "@/entities/models/publisher";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { AddIcon } from "@/fragments/icons";
import EmptyList from "@/fragments/empty-list";
import ListSkeleton from "@/fragments/list-skeleton";
import ListError from "@/fragments/list-error";
import LoadingBoundary from "@/fragments/loading-boundary";
import useListPublishers from "@/features/publisher/hooks/use-list-publishers";
import PublisherTable from "@/features/publisher/components/publisher-table";

import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function ListPublisherPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const list = useListPublishers();
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
                list.reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
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
                <LoadingBoundary.Root loader={list}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(list.data.length > 0) && (
                            <PublisherTable
                                data={list.data}
                                pagination={list.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={(page: number) => {
                                    list.pagination.setPage(page);
                                    list.reload();
                                }}
                            />
                        )}

                        <EmptyList shouldRender={list.data?.length === 0} />
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
