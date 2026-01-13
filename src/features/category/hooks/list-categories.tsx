import { usePagination } from "@shared/pagination";
import { useLoader } from "@shared/loader";

import type { Category } from "@features/category/types/category";
import type { Count, Pagination } from "@/common/pagination";
import type { Loader } from "@/common/loader";
import { useCategoryService } from "./category-service";

import useAlert from "@components/feedback/use-alert";

export interface UseListCategories {
    data: Category[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListCategories() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useCategoryService();

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

    const loader = useLoader<Category[]>({
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

export default useListCategories;
