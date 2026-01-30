import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Topic } from "@features/topic/types/topic";
import { useTopicService } from "@features/topic/hooks/topic-service";

export interface TopicSearchConfiguration extends PaginationConfiguration { }

export interface TopicSearchController extends SearchController<Topic> { }

export function useTopicSearch(
    config?: TopicSearchConfiguration
): TopicSearchController {
    const alert = useAlert();
    const service = useTopicService();

    return useSearch<Topic>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Topic[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
