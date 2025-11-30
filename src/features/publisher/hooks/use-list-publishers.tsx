import type { Publisher } from "@/types/models/publisher";

import { useEffect } from "react";
import type { Pagination } from "@/types/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/components/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

export interface UseListPublishers extends ListLoader<Publisher[]> {
    pagination: Pagination;
}

export function useListPublishers() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const loadList = async (pagination?: Pagination) => {
        return service.getAll({ pagination })
            .then((result) => {
                return result;
            });
    };

    const loadCount = () => {
        service.countAll()
            .then((result) => {
                pagination.setCount(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
                pagination.setCount(0);
            });
    };

    const loader = useListLoader<Publisher>({
        loadData: () => loadList(pagination),
    });

    useEffect(() => {
        loadCount();
    }, []);

    return {
        ...loader,
        pagination,
    };
}

export default useListPublishers;
