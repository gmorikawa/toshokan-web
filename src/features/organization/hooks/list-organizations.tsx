import type { Count, Pagination } from "@shared/search/types/pagination";
import type { Loader } from "@/layout/loader";
import { usePagination } from "@shared/search/hooks/pagination";
import { useLoader } from "@shared/loader";

import type { Organization } from "@features/organization/types/organization";
import { useOrganizationService } from "@features/organization/hooks/organization-service";

import { useAlert } from "@components/feedback/use-alert";

export interface UseListOrganizations {
    data: Organization[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListOrganizations() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useOrganizationService();

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

    const loader = useLoader<Organization[]>({
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

export default useListOrganizations;
