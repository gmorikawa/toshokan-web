import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Category } from "@features/category/types/category";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useCategoryService } from "@features/category/hooks/category-service";
import { useCategorySearch } from "@features/category/hooks/category-search";
import { CategoryTable } from "@features/category/components/category-table";

export function CategoryListPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const categories = useCategorySearch();
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
        categories.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Category"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleCreate}
                            leftIcon={<AddIcon />}
                        >
                            New
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
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
            </ApplicationContent>
        </ApplicationPage>
    );
}
