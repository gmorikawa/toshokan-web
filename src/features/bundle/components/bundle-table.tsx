import type { Pagination } from "@shared/search/types/pagination";
import { UpdateButton } from "@shared/application/components/update-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

import type { Bundle } from "@features/bundle/types/bundle";

export interface BundleTableProps {
    data: Bundle[];
    pagination: Pagination;

    onUpdate?: (entity: Bundle) => void;
    onRemove?: (entity: Bundle) => void;
    onPageChange?: (page: number) => void;
}

export function BundleTable({
    data,
    pagination,
    onUpdate,
    onRemove,
    onPageChange
}: BundleTableProps) {
    const handleUpdate = (entity: Bundle): void => {
        (onUpdate) && (onUpdate(entity));
    };

    const handleRemove = (entity: Bundle): void => {
        (onRemove) && (onRemove(entity));
    };

    const handlePageChange = (page: number): void => {
        (onPageChange) && (onPageChange(page));
    };

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
                        accessor: (bundle: Bundle) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(bundle)} />
                                <DeleteButton onClick={() => handleRemove(bundle)} />
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
