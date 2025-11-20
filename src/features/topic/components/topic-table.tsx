import type { Topic } from "@/entities/models/topic";
import type { Pagination } from "@/entities/query";

import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

export interface TopicTableProps {
    data: Topic[];
    pagination: Pagination;

    onUpdate?(entity: Topic): void;
    onRemove?(entity: Topic): void;
    onPageChange?(page: number): void;
}

export function TopicTable({ data, pagination, onUpdate, onRemove, onPageChange }: TopicTableProps) {
    function handleUpdate(entity: Topic): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Topic): void {
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
                        accessor: (topic: Topic) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(topic)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(topic)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (topic: Topic) => topic.name }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default TopicTable;
