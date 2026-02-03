import type { PageCount } from "@shared/search/types/pagination";
import type { SearchConfiguration, SearchController } from "@shared/search/hooks/search";
import { useSearch } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Topic } from "@features/topic/types/topic";
import { useTopicService } from "@features/topic/hooks/topic-service";
export interface TopicSearchConfiguration
    extends Omit<SearchConfiguration<Topic>, "fetchData" | "fetchCount"> { }

export interface TopicSearchController extends SearchController<Topic> { }

export function useTopicSearch(
    configuration?: TopicSearchConfiguration
): TopicSearchController {
    const alert = useAlert();
    const service = useTopicService();

    return useSearch<Topic>({
        filter: configuration?.filter,
        pagination: configuration?.pagination,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination, filters): Promise<Topic[]> => {
            return service.getAll({ pagination, filters })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
