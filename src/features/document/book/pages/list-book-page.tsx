import type { Book } from "@/types/models/book";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

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

import useBookSearch from "@/features/document/book/hooks/use-book-search";
import BookTable from "@/features/document/book/components/book-table";
import RestrictedContent from "@/features/auth/components/restricted-content";
import DocumentSearchField from "@/features/document/components/document-search-field";

export function ListBookPage() {
    const books = useBookSearch();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<BookService>(BookService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/book/form");
    };

    const handleUpdate = (entity: Book): void => {
        router.navigateTo(`/app/book/form/${entity.id}`);
    };

    const handleDetail = (entity: Book): void => {
        router.navigateTo(`/app/book/details/${entity.id}`);
    };

    const handleSearch = (query: string): void => {
        books.search(query);
    };

    const handlePageChange = (page: number): void => {
        books.pagination.update(page);
    };

    const handleRemove = (entity: Book): void => {
        service.remove(entity)
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
