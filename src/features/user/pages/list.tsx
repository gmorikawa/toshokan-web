import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { User } from "@features/user/types/user";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useUserService } from "@features/user/hooks/user-service";
import { useUserSearch } from "@features/user/hooks/user-search";
import { UserTable } from "@features/user/components/user-table";

export function UserListPage() {
    const authorization = useAuthorization("ADMIN");

    const users = useUserSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useUserService();

    const handleCreate = (): void => {
        navigate.to("/app/user/form");
    };

    const handleUpdate = (entity: User): void => {
        navigate.to(`/app/user/form/${entity.id}`);
    };

    const handleRemove = (entity: User): void => {
        service.delete(entity)
            .then(() => {
                users.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        users.changePage(page);
    };

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

            <ApplicationContent authorization={authorization}>
                {(users.data.length > 0) && (
                    <UserTable
                        data={users.data}
                        pagination={users.pagination}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        onPageChange={handlePageChange}
                    />
                )}

                {(users.data?.length === 0) && (
                    <EmptyList />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}
