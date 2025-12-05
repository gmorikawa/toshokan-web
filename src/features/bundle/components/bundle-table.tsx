import type { Bundle } from "@/features/bundle/types/bundle";
import type { Pagination } from "@/types/query";

import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

export interface BundleTableProps {
    data: Bundle[];
    pagination: Pagination;

    onUpdate?(entity: Bundle): void;
    onRemove?(entity: Bundle): void;
    onPageChange?(page: number): void;
}

export function BundleTable({ data, pagination, onUpdate, onRemove, onPageChange }: BundleTableProps) {
    function handleUpdate(entity: Bundle): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Bundle): void {
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
                        accessor: (bundle: Bundle) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(bundle)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(bundle)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Title", accessor: (bundle: Bundle) => bundle.title },
                    { header: "Description", accessor: (bundle: Bundle) => bundle.description }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default BundleTable;
