import type { Pagination } from "@shared/search/types/pagination";
import { UpdateButton } from "@shared/application/components/update-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

import type { Author } from "@features/author/types/author";

export interface AuthorTableProps {
    data: Author[];
    pagination: Pagination;

    onUpdate?: (entity: Author) => void;
    onRemove?: (entity: Author) => void;
    onPageChange?: (page: number) => void;
}

export function AuthorTable({
    data,
    pagination,
    onUpdate,
    onRemove,
    onPageChange
}: AuthorTableProps) {

    const handleUpdate = (entity: Author): void => {
        (onUpdate) && (onUpdate(entity));
    };

    const handleRemove = (entity: Author): void => {
        (onRemove) && (onRemove(entity));
    };

    const handlePageChange = (page: number): void => {
        (onPageChange) && (onPageChange(page));
    };

    return (
        <StackContainer spacing={4}>
            <PaginationControl
                count={pagination.count}
                pageSize={pagination.limit}
                page={pagination.page}
                onPageChange={handlePageChange}
            />

            <DataTable
                data={data}
                columns={[
                    {
                        width: "150px",
                        header: "Actions",
                        accessor: (author: Author) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(author)} />
                                <DeleteButton onClick={() => handleRemove(author)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Full name", accessor: (author: Author) => author.fullname }
                ]}>

            </DataTable>
        </StackContainer>
    );
}
