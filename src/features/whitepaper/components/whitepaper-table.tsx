import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { Pagination } from "@/common/pagination";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import OutlineButton from "@components/button/outline-button";
import PaginationControl from "@components/pagination/pagination-control";
import StackContainer from "@components/container/stack-container";
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

    function handleDetail(entity: Whitepaper): void {
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
                        accessor: (whitepaper: Whitepaper) => (
                            <FlexContainer spacing="2">
                                <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                                    <OutlineButton onClick={() => handleUpdate(whitepaper)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(whitepaper)}>Delete</OutlineButton>
                                </RestrictedContent>
                                <OutlineButton onClick={() => handleDetail(whitepaper)}>Details</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Title", accessor: (whitepaper: Whitepaper) => whitepaper.title }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default WhitepaperTable;
