import { useNavigator } from "@shared/router/hooks/navigator";

import type { Book } from "@features/book/types/book";

import { useAlert } from "@components/feedback/alert/controller";
import { useBookService } from "@features/book/hooks/book-service";
import { useBookSearch } from "@features/book/hooks/book-search";
import { BookTable } from "@features/book/components/book-table";

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

import { RestrictedContent } from "@features/auth/components/restricted-content";
import { DocumentSearchField } from "@features/document/components/document-search-field";

export function ListBookPage() {
    const books = useBookSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useBookService();

    const handleCreate = (): void => {
        navigate.to("/app/book/form");
    };

    const handleUpdate = (entity: Book): void => {
        navigate.to(`/app/book/form/${entity.id}`);
    };

    const handleDetail = (entity: Book): void => {
        navigate.to(`/app/book/details/${entity.id}`);
    };

    const handleSearch = (query: string): void => {
        books.search(query);
    };

    const handlePageChange = (page: number): void => {
        books.pagination.update(page);
    };

    const handleRemove = (entity: Book): void => {
        service.delete(entity)
            .then(() => {
                books.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Book"
                actionSlot={
                    <BoxContainer>
                        <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                            <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                        </RestrictedContent>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <DocumentSearchField
                    query={books.query}
                    onSearch={handleSearch}
                />

                <LoadingBoundary.Root loader={books.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(books.data.length > 0) && (
                            <BookTable
                                data={books.data}
                                pagination={books.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onDetail={handleDetail}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(books.data?.length === 0) && (
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

export default ListBookPage;
