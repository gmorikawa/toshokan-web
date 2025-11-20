import type { ResearchPaper } from "@/entities/models/research-paper";
import type { Pagination } from "@/entities/query";

import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

export interface ResearchPaperTableProps {
    data: ResearchPaper[];
    pagination: Pagination;

    onUpdate?(entity: ResearchPaper): void;
    onRemove?(entity: ResearchPaper): void;
    onPageChange?(page: number): void;
}

export function ResearchPaperTable({ data, pagination, onUpdate, onRemove, onPageChange }: ResearchPaperTableProps) {
    function handleUpdate(entity: ResearchPaper): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: ResearchPaper): void {
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
                        accessor: (researchPaper: ResearchPaper) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(researchPaper)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(researchPaper)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Title", accessor: (researchPaper: ResearchPaper) => researchPaper.title },
                    { header: "Keywords", accessor: (researchPaper: ResearchPaper) => researchPaper.keywords }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default ResearchPaperTable;
