import type { ResearchPaper } from "@features/document/research-paper/types/research-paper";
import type { Pagination } from "@/common/pagination";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import OutlineButton from "@components/button/outline-button";
import PaginationControl from "@components/pagination/pagination-control";
import StackContainer from "@components/container/stack-container";
import RestrictedContent from "@features/auth/components/restricted-content";

export interface ResearchPaperTableProps {
    data: ResearchPaper[];
    pagination: Pagination;

    onUpdate?(entity: ResearchPaper): void;
    onRemove?(entity: ResearchPaper): void;
    onDetail?(entity: ResearchPaper): void;
    onPageChange?(page: number): void;
}

export function ResearchPaperTable({ data, pagination, onUpdate, onRemove, onDetail, onPageChange }: ResearchPaperTableProps) {
    function handleUpdate(entity: ResearchPaper): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: ResearchPaper): void {
        (onRemove) && (onRemove(entity));
    }

    function handleDetail(entity: ResearchPaper): void {
        (onDetail) && (onDetail(entity));
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
                                <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                                    <OutlineButton onClick={() => handleUpdate(researchPaper)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(researchPaper)}>Delete</OutlineButton>
                                </RestrictedContent>
                                <OutlineButton onClick={() => handleDetail(researchPaper)}>Details</OutlineButton>
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
