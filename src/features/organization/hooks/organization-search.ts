import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { Organization } from "@features/organization/types/organization";
import { useOrganizationService } from "@features/organization/hooks/organization-service";

export interface OrganizationSearchConfiguration extends PaginationConfiguration { }

export interface OrganizationSearchController extends SearchController<Organization> { }

export function useOrganizationSearch(
    config?: OrganizationSearchConfiguration
): OrganizationSearchController {
    const alert = useAlert();
    const service = useOrganizationService();

    return useSearch<Organization>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<Organization[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
