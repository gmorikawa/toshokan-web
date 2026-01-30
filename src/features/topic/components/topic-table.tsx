import type { Pagination } from "@shared/search/types/pagination";
import { UpdateButton } from "@shared/application/components/update-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

import type { Topic } from "@features/topic/types/topic";

export interface TopicTableProps {
    data: Topic[];
    pagination: Pagination;

    onUpdate?: (entity: Topic) => void;
    onRemove?: (entity: Topic) => void;
    onPageChange?: (page: number) => void;
}

export function TopicTable({
    data,
    pagination,
    onUpdate,
    onRemove,
    onPageChange
}: TopicTableProps) {

    const handleUpdate = (entity: Topic): void => {
        (onUpdate) && (onUpdate(entity));
    };

    const handleRemove = (entity: Topic): void => {
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
