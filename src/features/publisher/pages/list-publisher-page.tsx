import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Publisher } from "@features/publisher/types/publisher";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";
import { usePublisherSearch } from "@features/publisher/hooks/publisher-search";
import { PublisherTable } from "@features/publisher/components/publisher-table";

export function ListPublisherPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();
    const service = usePublisherService();
    const publishers = usePublisherSearch();

    const handleCreate = (): void => {
        navigate.to("/app/publisher/form");
    };

    const handleUpdate = (entity: Publisher): void => {
        navigate.to(`/app/publisher/form/${entity.id}`);
    };

    const handleRemove = (entity: Publisher): void => {
        service.delete(entity)
            .then(() => {
                publishers.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        publishers.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Publisher"
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
                {(publishers.data.length > 0) && (
                    <PublisherTable
                        data={publishers.data}
                        pagination={publishers.pagination}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        onPageChange={handlePageChange}
                    />
                )}

                {(publishers.data?.length === 0) && (
                    <EmptyList />
                )}
            </ApplicationContent>
        </ApplicationPage >
    );
}
