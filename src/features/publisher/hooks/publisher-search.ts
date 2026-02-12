import type { PageCount } from "@shared/search/types/pagination";
import { useSearch, type SearchConfiguration, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Publisher } from "@features/publisher/types/publisher";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";

export interface PublisherSearchConfiguration
    extends Omit<SearchConfiguration<Publisher>, "fetchData" | "fetchCount"> { }

export interface PublisherSearchController extends SearchController<Publisher> { }

export function usePublisherSearch(
    configuration?: PublisherSearchConfiguration
): PublisherSearchController {
    const alert = useAlert();
    const service = usePublisherService();

    return useSearch<Publisher>({
        ...configuration,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Publisher[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
