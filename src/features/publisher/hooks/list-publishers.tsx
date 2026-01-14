import type { Count, Pagination } from "@shared/search/types/pagination";
import type { Loader } from "@/layout/loader";
import { usePagination } from "@shared/search/hooks/pagination";
import { useLoader } from "@shared/loader";

import type { Publisher } from "@features/publisher/types/publisher";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";

import { useAlert } from "@components/feedback/use-alert";

export interface UseListPublishers {
    data: Publisher[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListPublishers() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = usePublisherService()

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

    const loader = useLoader<Publisher[]>({
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

export default useListPublishers;
