import type { PageNumber } from "@shared/search/types/pagination";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Topic } from "@features/topic/types/topic";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useTopicService } from "@features/topic/hooks/topic-service";
import { useTopicSearch } from "@features/topic/hooks/topic-search";
import { TopicTable } from "@features/topic/components/topic-table";

export function TopicListPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const topics = useTopicSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useTopicService();

    const handleCreate = (): void => {
        navigate.to("/app/topic/form");
    };

    const handleUpdate = (entity: Topic): void => {
        navigate.to(`/app/topic/form/${entity.id}`);
    };

    const handleRemove = (entity: Topic): void => {
        service.delete(entity)
            .then(() => {
                topics.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: PageNumber): void => {
        topics.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Topic"
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
                {(topics.data.length > 0) && (
                    <TopicTable
                        data={topics.data}
                        pagination={topics.pagination}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        onPageChange={handlePageChange}
                    />
                )}

                {(topics.data?.length === 0) && (
                    <EmptyList />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}
