import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Author } from "@features/author/types/author";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useAuthorService } from "@features/author/hooks/author-service";
import { useAuthorSearch } from "@features/author/hooks/author-search";
import { AuthorTable } from "@features/author/components/author-table";

export function ListAuthorPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const authors = useAuthorSearch();
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
        authors.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Author"
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
            </ApplicationContent>
        </ApplicationPage>
    );
}
