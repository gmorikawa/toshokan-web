import { useNavigator } from "@shared/router/hooks/navigator";

import type { Author } from "@features/author/types/author";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useAuthorService } from "@features/author/hooks/author-service";
import { useListAuthors } from "@features/author/hooks/list-authors";
import { AuthorTable } from "@features/author/components/author-table";

import { useAlert } from "@components/feedback/alert/controller";

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

export function ListAuthorPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const authors = useListAuthors();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useAuthorService();

    const handleCreate = (): void => {
        navigate.to("/app/author/form");
    };

    const handleUpdate = (entity: Author): void => {
        navigate.to(`/app/author/form/${entity.id}`);
    };

    const handleRemove = (entity: Author): void => {
        service.delete(entity)
            .then(() => {
                authors.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        authors.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Author"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LoadingBoundary.Root loader={authors.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(authors.data.length > 0) && (
                            <AuthorTable
                                data={authors.data}
                                pagination={authors.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(authors.data?.length === 0) && (
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

export default ListAuthorPage;
