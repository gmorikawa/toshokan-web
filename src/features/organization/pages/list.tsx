import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Organization } from "@features/organization/types/organization";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useOrganizationService } from "@features/organization/hooks/organization-service";
import { useOrganizationSearch } from "@features/organization/hooks/organization-search";
import { OrganizationTable } from "@features/organization/components/organization-table";

export function OrganizationListPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const organizations = useOrganizationSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useOrganizationService();

    const handleCreate = (): void => {
        navigate.to("/app/organization/form");
    };

    const handleUpdate = (entity: Organization): void => {
        navigate.to(`/app/organization/form/${entity.id}`);
    };

    const handleRemove = (entity: Organization): void => {
        service.delete(entity)
            .then(() => {
                organizations.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        organizations.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Organization"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleCreate}
                            leftIcon={<AddIcon />}
                        >
                            New
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
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
            </ApplicationContent>
        </ApplicationPage>
    );
}
