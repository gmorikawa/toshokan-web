import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Category } from "@features/category/types/category";
import { useCategoryService } from "@features/category/hooks/category-service";

export interface CategorySearchConfiguration extends PaginationConfiguration { }

export interface CategorySearchController extends SearchController<Category> { }

export function useCategorySearch(
    config?: CategorySearchConfiguration
): CategorySearchController {
    const alert = useAlert();
    const service = useCategoryService();

    return useSearch<Category>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Category[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
