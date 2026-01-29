import type { Topic } from "@features/topic/types/topic";
import type { Pagination } from "@shared/search/types/pagination";

import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import PaginationControl from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

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
                        width: "150px",
                        header: "Actions",
                        accessor: (topic: Topic) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(topic)} />
                                <DeleteButton onClick={() => handleRemove(topic)} />
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
