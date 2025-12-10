import type { Author } from "@/types/models/author";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

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
import useListAuthors from "@/features/author/hooks/use-list-authors";
import AuthorTable from "@/features/author/components/author-table";

import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function ListAuthorPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const authors = useListAuthors();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/author/form");
    };

    const handleUpdate = (entity: Author): void => {
        router.navigateTo(`/app/author/form/${entity.id}`);
    };

    const handleRemove = (entity: Author): void => {
        service.remove(entity)
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
