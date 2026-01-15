import { useNavigator } from "@shared/router/hooks/navigator";

import type { Bundle } from "@features/bundle/types/bundle";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useListBundles } from "@features/bundle/hooks/list-bundles";
import { BundleTable } from "@features/bundle/components/bundle-table";

import useAlert from "@components/feedback/alert/controller";
import { useBundleService } from "@features/bundle/hooks/bundle-service";

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

export function ListBundlePage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const bundles = useListBundles();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useBundleService();

    const handleCreate = (): void => {
        navigate.to("/app/bundle/form");
    };

    const handleUpdate = (entity: Bundle): void => {
        navigate.to(`/app/bundle/form/${entity.id}`);
    };

    const handleRemove = (entity: Bundle): void => {
        service.delete(entity)
            .then(() => {
                bundles.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        bundles.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Bundle"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LoadingBoundary.Root loader={bundles.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(bundles.data.length > 0) && (
                            <BundleTable
                                data={bundles.data}
                                pagination={bundles.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(bundles.data?.length === 0) && (
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

export default ListBundlePage;
