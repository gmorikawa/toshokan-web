import type { Organization } from "@/types/models/organization";

import { useEffect } from "react";
import type { Pagination } from "@/types/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/components/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

export interface UseListOrganizations extends ListLoader<Organization[]> {
    pagination: Pagination;
}

export function useListOrganizations() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

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

    const loader = useListLoader<Organization>({
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

export default useListOrganizations;
