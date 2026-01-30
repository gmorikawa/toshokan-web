import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

export interface WhitepaperSearchConfiguration extends PaginationConfiguration { }

export interface WhitepaperSearchController extends SearchController<Whitepaper> { }

export function useWhitepaperSearch(
    config?: WhitepaperSearchConfiguration
): WhitepaperSearchController {
    const alert = useAlert();
    const service = useWhitepaperService();

    return useSearch<Whitepaper>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Whitepaper[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
