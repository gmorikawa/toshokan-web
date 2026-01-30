import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

export interface ResearchPaperSearchConfiguration extends PaginationConfiguration { }

export interface ResearchPaperSearchController extends SearchController<ResearchPaper> { }

export function useResearchPaperSearch(
    config?: ResearchPaperSearchConfiguration
): ResearchPaperSearchController {
    const alert = useAlert();
    const service = useResearchPaperService();

    return useSearch<ResearchPaper>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<ResearchPaper[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
