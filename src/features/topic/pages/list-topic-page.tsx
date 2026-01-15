import { useNavigator } from "@shared/router/hooks/navigator";

import type { Topic } from "@features/topic/types/topic";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useListTopics } from "@features/topic/hooks/list-topics";
import { TopicTable } from "@features/topic/components/topic-table";

import { useAlert } from "@components/feedback/alert/controller";
import { useTopicService } from "@features/topic/hooks/topic-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { AddIcon } from "@shared/icons";
import { EmptyList } from "@/layout/empty-list";
import { ListSkeleton } from "@/layout/list-skeleton";
import { ListError } from "@/layout/list-error";
import { LoadingBoundary } from "@/layout/loading-boundary";

export function ListTopicPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const topics = useListTopics();
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

    const handlePageChange = (page: number): void => {
        topics.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Topic"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LoadingBoundary.Root loader={topics.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
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
                    </LoadingBoundary.SuccessState>

                    <LoadingBoundary.ErrorState>
                        <ListError />
                    </LoadingBoundary.ErrorState>
                </LoadingBoundary.Root>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListTopicPage;
