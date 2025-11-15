import { useEffect, useState } from "react";
import type { User } from "@/entities/models/user";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";

import { AddIcon } from "@/fragments/icons";

function UserListPage() {
    const alert = useAlert();
    const router = useRouter();
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
                loadList();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const loadList = () => {
        service.getAll()
            .then((result) => {
                setList(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    useEffect(() => {
        loadList();
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
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UserListPage;
