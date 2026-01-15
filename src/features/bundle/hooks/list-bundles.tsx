import { usePagination } from "@shared/search/hooks/pagination";
import { useLoader } from "@shared/loader";

import type { Bundle } from "@features/bundle/types/bundle";
import type { Count, Pagination } from "@shared/search/types/pagination";
import type { Loader } from "@/layout/loader";

import useAlert from "@components/feedback/alert/controller";
import { useBundleService } from "./bundle-service";

export interface UseListBundles {
    data: Bundle[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListBundles() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useBundleService();

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

    const loader = useLoader<Bundle[]>({
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

export default useListBundles;
