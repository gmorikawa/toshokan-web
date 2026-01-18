import type { Publisher } from "@features/publisher/types/publisher";
import type { Pagination } from "@shared/search/types/pagination";

import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import PaginationControl from "@components/pagination/pagination-control";
import StackContainer from "@components/container/stack-container";

export interface PublisherTableProps {
    data: Publisher[];
    pagination: Pagination;

    onUpdate?(entity: Publisher): void;
    onRemove?(entity: Publisher): void;
    onPageChange?(page: number): void;
}

export function PublisherTable({ data, pagination, onUpdate, onRemove, onPageChange }: PublisherTableProps) {
    function handleUpdate(entity: Publisher): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Publisher): void {
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
                        width: "150px",
                        header: "Actions",
                        accessor: (publisher: Publisher) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(publisher)} />
                                <DeleteButton onClick={() => handleRemove(publisher)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (publisher: Publisher) => publisher.name }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default PublisherTable;
