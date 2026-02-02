import type { Pagination } from "@shared/search/types/pagination";
import { OpenButton } from "@shared/application/components/open-button";
import { UpdateButton } from "@shared/application/components/update-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { RestrictedContent } from "@features/auth/components/restricted-content";

export interface WhitepaperTableProps {
    data: Whitepaper[];
    pagination: Pagination;

    onUpdate?: (entity: Whitepaper) => void;
    onRemove?: (entity: Whitepaper) => void;
    onDetail?: (entity: Whitepaper) => void;
    onPageChange?: (page: number) => void;
}

export function WhitepaperTable({
    data,
    pagination,
    onUpdate,
    onRemove,
    onDetail,
    onPageChange
}: WhitepaperTableProps) {

    const handleUpdate = (entity: Whitepaper): void => {
        (onUpdate) && (onUpdate(entity));
    };

    const handleRemove = (entity: Whitepaper): void => {
        (onRemove) && (onRemove(entity));
    };

    const handleOpen = (entity: Whitepaper): void => {
        (onDetail) && (onDetail(entity));
    };

    const handlePageChange = (page: number): void => {
        (onPageChange) && (onPageChange(page));
    };

    return (
        <StackContainer spacing={4}>
            <PaginationControl
                count={pagination.count}
                pageSize={pagination.limit}
                page={pagination.page}
                onPageChange={handlePageChange}
            />

            <DataTable
                data={data}
                columns={[
                    {
                        width: "150px",
                        header: "Actions",
                        accessor: (whitepaper: Whitepaper) => (
                            <FlexContainer>
                                <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                                    <UpdateButton onClick={() => handleUpdate(whitepaper)} />
                                    <DeleteButton onClick={() => handleRemove(whitepaper)} />
                                </RestrictedContent>
                                <OpenButton onClick={() => handleOpen(whitepaper)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Title", accessor: (whitepaper: Whitepaper) => whitepaper.title },
                    { header: "Organization", accessor: (whitepaper: Whitepaper) => whitepaper.organization?.name },
                    { header: "Publishing Year", accessor: (whitepaper: Whitepaper) => whitepaper.publishingYear },
                    { header: "Authors", accessor: (whitepaper: Whitepaper) => whitepaper.authors?.map(author => author.fullname).join(", ") }
                ]}>

            </DataTable>
        </StackContainer>
    );
}
