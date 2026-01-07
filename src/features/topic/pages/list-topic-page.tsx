import { useNavigator } from "@shared/router/hooks/navigator";

import type { Topic } from "@features/topic/types/topic";
import { useAuthorizationFilter } from "@features/auth/hooks/use-authorization-filter";
import { useListTopics } from "@features/topic/hooks/use-list-topics";
import { TopicTable } from "@features/topic/components/topic-table";

import { useAlert } from "@components/feedback/use-alert";
import { useService } from "@/services/use-service";
import { TopicService } from "@/services/topic-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { AddIcon } from "@/common/icons";
import { EmptyList } from "@/common/empty-list";
import { ListSkeleton } from "@/common/list-skeleton";
import { ListError } from "@/common/list-error";
import { LoadingBoundary } from "@/common/loading-boundary";

export function ListTopicPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const topics = useListTopics();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useService<TopicService>(TopicService, { includeAuthorization: true });

    const handleCreate = (): void => {
        navigate.to("/app/topic/form");
    };

    const handleUpdate = (entity: Topic): void => {
        navigate.to(`/app/topic/form/${entity.id}`);
    };

    const handleRemove = (entity: Topic): void => {
        service.remove(entity)
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
