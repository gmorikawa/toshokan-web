import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import type { User } from "@features/user/types/user";
import type { Pagination } from "@shared/search/types/pagination";

import { DataTable } from "@components/table/data-table";
import { FlexContainer } from "@components/container/flex-container";
import { PaginationControl } from "@components/pagination/pagination-control";
import { StackContainer } from "@components/container/stack-container";

export interface UserTableProps {
    data: User[];
    pagination: Pagination;

    onUpdate?(entity: User): void;
    onRemove?(entity: User): void;
    onPageChange?(page: number): void;
}

export function UserTable({ data, pagination, onUpdate, onRemove, onPageChange }: UserTableProps) {
    function handleUpdate(entity: User): void {
        (onUpdate) && (onUpdate(entity));
    }

    function handleRemove(entity: User): void {
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
                        accessor: (user: User) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(user)} />
                                <DeleteButton onClick={() => handleRemove(user)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Username", accessor: (user: User) => user.username },
                    { header: "Email", accessor: (user: User) => user.email },
                    { header: "Full Name", accessor: (user: User) => user.fullname },
                    { header: "Role", accessor: (user: User) => user.role },
                    { header: "Status", accessor: (user: User) => user.status }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default UserTable;