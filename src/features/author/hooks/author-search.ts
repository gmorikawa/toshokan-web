import type { PageCount } from "@shared/search/types/pagination";
import type { SearchConfiguration, SearchController } from "@shared/search/hooks/search";
import { useSearch } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Author } from "@features/author/types/author";
import type { AuthorFilter } from "@features/author/types/query";
import { useAuthorService } from "@features/author/hooks/author-service";

export interface AuthorSearchConfiguration
    extends Omit<SearchConfiguration<Author, AuthorFilter>, "fetchData" | "fetchCount"> { }

export interface AuthorSearchController extends SearchController<Author, AuthorFilter> { }

export function useAuthorSearch(
    configuration?: AuthorSearchConfiguration
): AuthorSearchController {
    const alert = useAlert();
    const service = useAuthorService();

    return useSearch<Author>({
        filter: configuration?.filter,
        pagination: configuration?.pagination,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination, filters): Promise<Author[]> => {
            return service.getAll({ pagination, filters })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
