import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { Pagination } from "@shared/search/types/pagination";

import { OpenButton } from "@layout/button/open";
import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";
import { RestrictedContent } from "@features/auth/components/restricted-content";

export interface WhitepaperTableProps {
    data: Whitepaper[];
    pagination: Pagination;

    onUpdate?(entity: Whitepaper): void;
    onRemove?(entity: Whitepaper): void;
    onDetail?(entity: Whitepaper): void;
    onPageChange?(page: number): void;
}

export function WhitepaperTable({ data, pagination, onUpdate, onRemove, onDetail, onPageChange }: WhitepaperTableProps) {
    function handleUpdate(entity: Whitepaper): void {
        (onUpdate) && (onUpdate(entity));
    }

    function handleRemove(entity: Whitepaper): void {
        (onRemove) && (onRemove(entity));
    }

    function handleOpen(entity: Whitepaper): void {
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

export default WhitepaperTable;
