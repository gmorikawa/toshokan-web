import type { Book } from "@/entities/models/book";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

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
import useListBooks from "@/features/document/book/hooks/use-list-books";
import BookTable from "@/features/document/book/components/book-table";
import RestrictedContent from "@/features/auth/components/restricted-content";

export function ListBookPage() {
    const list = useListBooks();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<BookService>(BookService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/book/form");
    };

    const handleUpdate = (entity: Book): void => {
        router.navigateTo(`/app/book/form/${entity.id}`);
    };

    const handleRemove = (entity: Book): void => {
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
                <LoadingBoundary.Root loader={list}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(list.data.length > 0) && (
                            <BookTable
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

export default ListBookPage;
