import { useNavigator } from "@shared/router/hooks/navigator";

import type { Category } from "@features/category/types/category";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useListCategories } from "@features/category/hooks/list-categories";
import { CategoryTable } from "@features/category/components/category-table";

import { useAlert } from "@components/feedback/use-alert";
import { useCategoryService } from "@features/category/hooks/category-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { AddIcon } from "@/common/icons";
import { EmptyList } from "@/common/empty-list";
import { ListSkeleton } from "@/common/list-skeleton";
import { ListError } from "@/common/list-error";
import { LoadingBoundary } from "@/common/loading-boundary";

export function ListCategoryPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const categories = useListCategories();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useCategoryService();

    const handleCreate = (): void => {
        navigate.to("/app/category/form");
    };

    const handleUpdate = (entity: Category): void => {
        navigate.to(`/app/category/form/${entity.id}`);
    };

    const handleRemove = (entity: Category): void => {
        service.delete(entity)
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
