import type { Category } from "@features/category/types/category";
import type { Pagination } from "@shared/search/types/pagination";

import { UpdateButton } from "@shared/application/components/update-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import PaginationControl from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

export interface CategoryTableProps {
    data: Category[];
    pagination: Pagination;

    onUpdate?: (entity: Category) => void;
    onRemove?: (entity: Category) => void;
    onPageChange?: (page: number) => void;
}

export function CategoryTable({
    data,
    pagination,
    onUpdate,
    onRemove,
    onPageChange
}: CategoryTableProps) {
    const handleUpdate = (entity: Category): void => {
        (onUpdate) && (onUpdate(entity));
    };
    
    const handleRemove = (entity: Category): void => {
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
                        accessor: (category: Category) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(category)} />
                                <DeleteButton onClick={() => handleRemove(category)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (category: Category) => category.name }
                ]}>

            </DataTable>
        </StackContainer>
    );
}
