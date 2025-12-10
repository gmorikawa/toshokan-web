import type { Organization } from "@/types/models/organization";
import type { Count, Pagination } from "@/common/pagination";
import type { Loader } from "@/common/loader";

import useAlert from "@/components/feedback/use-alert";
import usePagination from "@/hooks/use-pagination";
import useLoader from "@/hooks/use-loader";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

export interface UseListOrganizations {
    data: Organization[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListOrganizations() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

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
