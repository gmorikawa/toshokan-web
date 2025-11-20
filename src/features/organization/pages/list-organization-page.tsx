import type { Organization } from "@/entities/models/organization";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { AddIcon } from "@/fragments/icons";
import EmptyList from "@/fragments/empty-list";
import ListSkeleton from "@/fragments/list-skeleton";
import ListError from "@/fragments/list-error";
import LoadingBoundary from "@/fragments/loading-boundary";
import useListOrganizations from "@/features/organization/hooks/use-list-organizations";
import OrganizationTable from "@/features/organization/components/organization-table";

export function ListOrganizationPage() {
    const list = useListOrganizations();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/organization/form");
    };

    const handleUpdate = (entity: Organization): void => {
        router.navigateTo(`/app/organization/form/${entity.id}`);
    };

    const handleRemove = (entity: Organization): void => {
        service.remove(entity)
            .then(() => {
                list.reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
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

            <ApplicationContent>
                <LoadingBoundary.Root loader={list}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(list.data.length > 0) && (
                            <OrganizationTable
                                data={list.data}
                                pagination={list.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={(page: number) => {
                                    list.pagination.setPage(page);
                                    list.reload();
                                }}
                            />
                        )}

                        <EmptyList shouldRender={list.data?.length === 0} />
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
