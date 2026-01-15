import type { Count, Pagination } from "@shared/search/types/pagination";
import type { Loader } from "@/layout/loader";
import { usePagination } from "@shared/search/hooks/pagination";
import { useLoader } from "@shared/loader";

import type { Language } from "@features/language/types/language";
import { useLanguageService } from "@features/language/hooks/language-service";

import { useAlert } from "@components/feedback/alert/controller";

export interface UseListLanguages {
    data: Language[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListLanguages() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useLanguageService();

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

    const loader = useLoader<Language[]>({
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

export default useListLanguages;
