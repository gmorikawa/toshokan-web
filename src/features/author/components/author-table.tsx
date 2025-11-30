import type { Author } from "@/types/models/author";
import type { Pagination } from "@/types/query";

import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

export interface AuthorTableProps {
    data: Author[];
    pagination: Pagination;

    onUpdate?(entity: Author): void;
    onRemove?(entity: Author): void;
    onPageChange?(page: number): void;
}

export function AuthorTable({ data, pagination, onUpdate, onRemove, onPageChange }: AuthorTableProps) {
    function handleUpdate(entity: Author): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Author): void {
        (onRemove) && (onRemove(entity));
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
                        header: "Actions",
                        accessor: (author: Author) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(author)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(author)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Full name", accessor: (author: Author) => author.fullname }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default AuthorTable;
