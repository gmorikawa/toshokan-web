import type { Publisher } from "@/types/models/publisher";
import type { Pagination } from "@/types/query";

import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

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
                        header: "Actions",
                        accessor: (publisher: Publisher) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(publisher)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(publisher)}>Delete</OutlineButton>
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
