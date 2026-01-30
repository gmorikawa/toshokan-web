import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Language } from "@features/language/types/language";
import { useLanguageService } from "@features/language/hooks/language-service";

export interface LanguageSearchConfiguration extends PaginationConfiguration { }

export interface LanguageSearchController extends SearchController<Language> { }

export function useLanguageSearch(
    config?: LanguageSearchConfiguration
): LanguageSearchController {
    const alert = useAlert();
    const service = useLanguageService();

    return useSearch<Language>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Language[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
