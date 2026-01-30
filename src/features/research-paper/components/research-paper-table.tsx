import { OpenButton } from "@shared/application/components/open-button";
import { UpdateButton } from "@shared/application/components/update-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import type { Pagination } from "@shared/search/types/pagination";
import { RestrictedContent } from "@features/auth/components/restricted-content";


export interface ResearchPaperTableProps {
    data: ResearchPaper[];
    pagination: Pagination;

    onUpdate?: (entity: ResearchPaper) => void;
    onRemove?: (entity: ResearchPaper) => void;
    onDetail?: (entity: ResearchPaper) => void;
    onPageChange?: (page: number) => void;
}

export function ResearchPaperTable({
    data, pagination,
    onUpdate,
    onRemove,
    onDetail,
    onPageChange
}: ResearchPaperTableProps) {

    const handleUpdate = (entity: ResearchPaper): void => {
        (onUpdate) && (onUpdate(entity));
    };

    const handleRemove = (entity: ResearchPaper): void => {
        (onRemove) && (onRemove(entity));
    };

    const handleDetail = (entity: ResearchPaper): void => {
        (onDetail) && (onDetail(entity));
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
                        accessor: (researchPaper: ResearchPaper) => (
                            <FlexContainer>
                                <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                                    <UpdateButton onClick={() => handleUpdate(researchPaper)} />
                                    <DeleteButton onClick={() => handleRemove(researchPaper)} />
                                </RestrictedContent>
                                <OpenButton onClick={() => handleDetail(researchPaper)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Title", accessor: (researchPaper: ResearchPaper) => researchPaper.title },
                    { header: "Organization", accessor: (researchPaper: ResearchPaper) => researchPaper.organization?.name },
                    { header: "Publishing Year", accessor: (researchPaper: ResearchPaper) => researchPaper.publishingYear },
                    { header: "Authors", accessor: (researchPaper: ResearchPaper) => researchPaper.authors?.map(author => author.fullname).join(", ") },
                    { header: "Keywords", accessor: (researchPaper: ResearchPaper) => researchPaper.keywords },
                ]}>

            </DataTable>
        </StackContainer>
    );
}
