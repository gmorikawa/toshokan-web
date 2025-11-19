import { useEffect, useState } from "react";
import type { User } from "@/entities/models/user";
import type { Pagination } from "@/entities/query";

import useAlert from "@/hooks/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";
import OutlineButton from "@/components/button/outline-button";

import { AddIcon } from "@/fragments/icons";

export function ListUserPage() {
    const alert = useAlert();
    const router = useRouter();
    const pagination = usePagination();
    const service = useService<UserService>(UserService, { includeAuthorization: true });
    const [list, setList] = useState<User[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/user/form");
    };

    const handleUpdate = (entity: User): void => {
        router.navigateTo(`/app/user/form/${entity.id}`);
    };

    const handleRemove = (entity: User): void => {
        service.remove(entity)
            .then(() => {
                loadList(pagination);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const loadList = (pagination?: Pagination) => {
        service.getAll({ pagination })
            .then((result) => {
                setList(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const loadCount = () => {
        service.countAll()
            .then((result) => {
                pagination.setCount(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
                pagination.setCount(0);
            });
    };

    useEffect(() => {
        loadList(pagination);
        loadCount();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="User"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <StackContainer spacing={4}>
                    <PaginationControl
                        count={pagination.count}
                        pageSize={pagination.size}
                        page={pagination.page}
                        onPageChange={(page) => {
                            pagination.setPage(page);
                            loadList({ page: page, size: pagination.size });
                        }}
                    />
                    <DataTable
                        data={list}
                    columns={[
                        {
                            header: "Actions",
                            accessor: (row: User) => (
                                <FlexContainer spacing="2">
                                    <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                                </FlexContainer>
                            )
                        },
                        { header: "Username", accessor: (row: any) => row.username },
                        { header: "Email", accessor: (row: any) => row.email },
                        { header: "Full Name", accessor: (row: any) => row.fullname },
                        { header: "Role", accessor: (row: any) => row.role },
                        { header: "Status", accessor: (row: any) => row.status }
                    ]}>

                </DataTable>
                </StackContainer>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListUserPage;
