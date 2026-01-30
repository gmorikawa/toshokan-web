import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";

export interface BookSearchConfiguration extends PaginationConfiguration { }

export interface BookSearchController extends SearchController<Book> { }

export function useBookSearch(
    config?: BookSearchConfiguration
): BookSearchController {
    const alert = useAlert();
    const service = useBookService();

    return useSearch<Book>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Book[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
