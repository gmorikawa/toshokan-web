import { useNavigator } from "@shared/router/hooks/navigator";
import { AddIcon } from "@shared/icons";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";
import { useBookSearch } from "@features/book/hooks/book-search";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { BookTable } from "@features/book/components/book-table";
import { DocumentSearchField } from "@features/document/components/document-search-field";

export function BookListPage() {
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useBookService();
    const books = useBookSearch({
        pagination: {
            initialPage: 1,
            initialLimit: 10,
        },
        filter: {
            initialFilters: [
                { name: "contains_title", value: null }
            ]
        }
    });

    const handleCreate = (): void => {
        navigate.to("/app/book/form");
    };

    const handleUpdate = (entity: Book): void => {
        navigate.to(`/app/book/form/${entity.id}`);
    };

    const handleDetail = (entity: Book): void => {
        navigate.to(`/app/book/details/${entity.id}`);
    };

    // const handleSearch = (query: string): void => {
    //     books.search(query);
    // };

    const handlePageChange = (page: number): void => {
        books.changePage(page);
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
                            <ActionButton
                                variant="text"
                                onClick={handleCreate}
                                leftIcon={<AddIcon />}
                            >
                                New
                            </ActionButton>
                        </RestrictedContent>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <DocumentSearchField
                    query={books.getFilterValue<string>("contains_title") || ""}
                    onSearch={(newValue) => {
                        if (newValue === undefined || newValue === null || newValue === "") {
                            books.changeFilter("contains_title", null);
                        } else {
                            books.changeFilter("contains_title", newValue);
                        }
                    }}
                />

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
            </ApplicationContent>
        </ApplicationPage>
    );
}
