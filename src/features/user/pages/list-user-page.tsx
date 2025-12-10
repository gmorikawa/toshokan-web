import type { User } from "@/features/user/types/user";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { AddIcon } from "@/common/icons";
import EmptyList from "@/common/empty-list";
import ListSkeleton from "@/common/list-skeleton";
import ListError from "@/common/list-error";
import LoadingBoundary from "@/common/loading-boundary";

import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";
import useListUsers from "@/features/user/hooks/use-list-users";
import UserTable from "@/features/user/components/user-table";

export function ListUserPage() {
    const authorization = useAuthorizationFilter("ADMIN");

    const users = useListUsers();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<UserService>(UserService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/user/form");
    };

    const handleUpdate = (entity: User): void => {
        router.navigateTo(`/app/user/form/${entity.id}`);
    };

    const handleRemove = (entity: User): void => {
        service.remove(entity)
            .then(() => {
                users.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        users.pagination.update(page);
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
                <LoadingBoundary.Root loader={users.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
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
                    </LoadingBoundary.SuccessState>

                    <LoadingBoundary.ErrorState>
                        <ListError />
                    </LoadingBoundary.ErrorState>
                </LoadingBoundary.Root>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListUserPage;
