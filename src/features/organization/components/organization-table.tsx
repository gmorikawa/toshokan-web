import type { Organization } from "@features/organization/types/organization";
import type { Pagination } from "@shared/search/types/pagination";

import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import PaginationControl from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

export interface OrganizationTableProps {
    data: Organization[];
    pagination: Pagination;

    onUpdate?(entity: Organization): void;
    onRemove?(entity: Organization): void;
    onPageChange?(page: number): void;
}

export function OrganizationTable({ data, pagination, onUpdate, onRemove, onPageChange }: OrganizationTableProps) {
    function handleUpdate(entity: Organization): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Organization): void {
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
                        accessor: (organization: Organization) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(organization)} />
                                <DeleteButton onClick={() => handleRemove(organization)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (organization: Organization) => organization.name },
                    { header: "Type", accessor: (organization: Organization) => organization.type }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default OrganizationTable;
