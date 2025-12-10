import type { User } from "@/types/models/user";
import type { Pagination } from "@/common/pagination";

import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

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
                        header: "Actions",
                        accessor: (user: User) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(user)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(user)}>Delete</OutlineButton>
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