import { useNavigator } from '@shared/router/hooks/navigator';

import type { Organization } from "@/features/organization/types/organization";

import useAlert from "@/components/feedback/use-alert";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

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
import useListOrganizations from "@/features/organization/hooks/use-list-organizations";
import OrganizationTable from "@/features/organization/components/organization-table";

export function ListOrganizationPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const organizations = useListOrganizations();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    const handleCreate = (): void => {
        navigate.to("/app/organization/form");
    };

    const handleUpdate = (entity: Organization): void => {
        navigate.to(`/app/organization/form/${entity.id}`);
    };

    const handleRemove = (entity: Organization): void => {
        service.remove(entity)
            .then(() => {
                organizations.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        organizations.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Organization"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LoadingBoundary.Root loader={organizations.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(organizations.data.length > 0) && (
                            <OrganizationTable
                                data={organizations.data}
                                pagination={organizations.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(organizations.data?.length === 0) && (
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

export default ListOrganizationPage;
