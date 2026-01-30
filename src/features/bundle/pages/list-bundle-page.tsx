import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Bundle } from "@features/bundle/types/bundle";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useBundleService } from "@features/bundle/hooks/bundle-service";
import { useBundleSearch } from "@features/bundle/hooks/bundle-search";
import { BundleTable } from "@features/bundle/components/bundle-table";

export function ListBundlePage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const bundles = useBundleSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useBundleService();

    const handleCreate = (): void => {
        navigate.to("/app/bundle/form");
    };

    const handleUpdate = (entity: Bundle): void => {
        navigate.to(`/app/bundle/form/${entity.id}`);
    };

    const handleRemove = (entity: Bundle): void => {
        service.delete(entity)
            .then(() => {
                bundles.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        bundles.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Bundle"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                {(bundles.data.length > 0) && (
                    <BundleTable
                        data={bundles.data}
                        pagination={bundles.pagination}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        onPageChange={handlePageChange}
                    />
                )}

                {(bundles.data?.length === 0) && (
                    <EmptyList />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}
