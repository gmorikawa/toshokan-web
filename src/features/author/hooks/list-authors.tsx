import { usePagination } from "@shared/search/hooks/pagination";
import { useLoader } from "@shared/loader";

import type { Author } from "@features/author/types/author";
import type { Count, Pagination } from "@shared/search/types/pagination";
import type { Loader } from "@/layout/loader";

import useAlert from "@components/feedback/use-alert";
import { useAuthorService } from "./author-service";

export interface UseListAuthors {
    data: Author[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListAuthors() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useAuthorService();

    const loadList = async (pagination?: Pagination) => {
        return service.getAll({ pagination });
    };

    const loadCount = () => {
        service.countAll()
            .then((count: Count) => {
                pagination.update(pagination.page, pagination.size, count);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
                pagination.update(pagination.page, pagination.size, 0);
            });
    };

    const loader = useLoader<Author[]>({
        loadFunction: async () => {
            loadCount();
            return loadList(pagination);
        },
        dependencies: [pagination.page, pagination.size],
    });

    const refresh = () => {
        loader.load();
    };

    return {
        data: loader.data || [],
        pagination,
        loader,
        refresh,
    };
}

export default useListAuthors;
