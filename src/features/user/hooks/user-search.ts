import type { PageCount } from "@shared/search/types/pagination";
import type { PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useSearch, type SearchController } from "@shared/search/hooks/search";

import { useAlert } from "@components/feedback/alert/controller";

import type { User } from "@features/user/types/user";
import { useUserService } from "@features/user/hooks/user-service";

export interface UserSearchConfiguration extends PaginationConfiguration { }

export interface UserSearchController extends SearchController<User> { }

export function useUserSearch(
    config?: UserSearchConfiguration
): UserSearchController {
    const alert = useAlert();
    const service = useUserService();

    return useSearch<User>({
        ...config,
        fetchCount: async (): Promise<PageCount> => {
            return service.countAll()
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return 0;
                });
        },
        fetchData: async (pagination): Promise<User[]> => {
            return service.getAll({ pagination })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return [];
                });
        },
    });
}
