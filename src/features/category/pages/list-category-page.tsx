import { useNavigator } from '@shared/router/hooks/navigator';

import type { Category } from "@/features/category/types/category";

import useAlert from "@/components/feedback/use-alert";
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

    const categories = useListCategories();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });

    const handleCreate = (): void => {
        navigate.to("/app/category/form");
    };

    const handleUpdate = (entity: Category): void => {
        navigate.to(`/app/category/form/${entity.id}`);
    };

    const handleRemove = (entity: Category): void => {
        service.remove(entity)
            .then(() => {
                categories.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        categories.pagination.update(page);
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
                <LoadingBoundary.Root loader={categories.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(categories.data.length > 0) && (
                            <CategoryTable
                                data={categories.data}
                                pagination={categories.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(categories.data?.length === 0) && (
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
