import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Author } from "@features/author/types/author";
import { useAuthorService } from "@features/author/hooks/author-service";

type Milliseconds = number;
type Name = string;

export interface AuthorSearchConfiguration extends PaginationConfiguration {
    debounceTime?: Milliseconds;
    defaultFullname?: Name;
}

export interface AuthorSearchController extends SearchController<Author> { }

export function useAuthorSearch(
    configuration?: AuthorSearchConfiguration
): AuthorSearchController {
    const alert = useAlert();
    const service = useAuthorService();

    return useSearch<Author>({
        ...configuration,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Author[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
