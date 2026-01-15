import { usePagination } from "@shared/search/hooks/pagination";
import { useLoader } from "@shared/loader";

import type { Topic } from "@features/topic/types/topic";
import type { Count, Pagination } from "@shared/search/types/pagination";
import type { Loader } from "@/layout/loader";

import { useTopicService } from "@features/topic/hooks/topic-service";

import { useAlert } from "@components/feedback/alert/controller";

export interface UseListTopics {
    data: Topic[]
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListTopics() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useTopicService();

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

    const loader = useLoader<Topic[]>({
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

export default useListTopics;
