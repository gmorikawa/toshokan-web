import type { Category } from "@/types/models/category";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

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
import useListCategories from "@/features/category/hooks/use-list-categories";
import CategoryTable from "@/features/category/components/category-table";

import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function ListCategoryPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const list = useListCategories();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/category/form");
    };

    const handleUpdate = (entity: Category): void => {
        router.navigateTo(`/app/category/form/${entity.id}`);
    };

    const handleRemove = (entity: Category): void => {
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
                title="Category"
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
                            <CategoryTable
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

                        {(list.data?.length === 0) && (
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

export default ListCategoryPage;
