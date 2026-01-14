import type { Category } from "@features/category/types/category";
import type { Pagination } from "@shared/search/types/pagination";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import OutlineButton from "@components/button/outline-button";
import PaginationControl from "@components/pagination/pagination-control";
import StackContainer from "@components/container/stack-container";

export interface CategoryTableProps {
    data: Category[];
    pagination: Pagination;

    onUpdate?(entity: Category): void;
    onRemove?(entity: Category): void;
    onPageChange?(page: number): void;
}

export function CategoryTable({ data, pagination, onUpdate, onRemove, onPageChange }: CategoryTableProps) {
    function handleUpdate(entity: Category): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Category): void {
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
                        accessor: (category: Category) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(category)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(category)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (category: Category) => category.name }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default CategoryTable;
