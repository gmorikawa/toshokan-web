import type { Pagination } from "@shared/search/types/pagination";

import { OpenButton } from "@layout/button/open";
import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import type { Book } from "@features/book/types/book";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { BookTitle } from "@features/book/components/book-title";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

export interface BookTableProps {
    data: Book[];
    pagination: Pagination;

    onUpdate?(entity: Book): void;
    onRemove?(entity: Book): void;
    onDetail?(entity: Book): void;
    onPageChange?(page: number): void;
}

export function BookTable({ data, pagination, onUpdate, onRemove, onDetail, onPageChange }: BookTableProps) {
    function handleUpdate(entity: Book): void {
        (onUpdate) && (onUpdate(entity));
    }

    function handleRemove(entity: Book): void {
        (onRemove) && (onRemove(entity));
    }

    function handleOpen(entity: Book): void {
        (onDetail) && (onDetail(entity));
    }

    function handlePageChange(page: number): void {
        (onPageChange) && (onPageChange(page));
    }

    return (
        <StackContainer spacing={4}>
            <PaginationControl
                count={pagination.count}
                pageSize={pagination.size}
                page={pagination.page}
                onPageChange={handlePageChange}
            />

            <DataTable
                data={data}
                columns={[
                    {
                        width: "150px",
                        header: "Actions",
                        accessor: (book: Book) => (
                            <FlexContainer>
                                <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                                    <UpdateButton onClick={() => handleUpdate(book)} />
                                    <DeleteButton onClick={() => handleRemove(book)} />
                                </RestrictedContent>
                                <OpenButton onClick={() => handleOpen(book)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Title", accessor: (book: Book) => <BookTitle book={book} /> },
                    { header: "Category", accessor: (book: Book) => book.category?.name },
                    { header: "Publisher", accessor: (book: Book) => book.publisher?.name },
                    { header: "Publishing Year", accessor: (book: Book) => book.publishingYear },
                    { header: "Authors", accessor: (book: Book) => book.authors?.map(author => author.fullname).join(", ") }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default BookTable;
