import type { PageCount } from "@shared/search/types/pagination";
import type { SearchConfiguration, SearchController } from "@shared/search/hooks/search";
import { useSearch } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";

export interface BookSearchConfiguration
    extends Omit<SearchConfiguration<Book>, "fetchData" | "fetchCount"> { }

export interface BookSearchController extends SearchController<Book> { }

export function useBookSearch(
    configuration?: BookSearchConfiguration
): BookSearchController {
    const alert = useAlert();
    const service = useBookService();

    return useSearch<Book>({
        pagination: configuration?.pagination,
        filter: configuration?.filter,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination, filters): Promise<Book[]> => {
            return service.getAll({ pagination, filters })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
