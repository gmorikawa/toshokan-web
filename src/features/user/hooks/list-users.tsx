import type { Count, Pagination } from "@/common/pagination";
import type { Loader } from "@/common/loader";
import { usePagination } from "@shared/pagination";
import { useLoader } from "@shared/loader";

import type { User } from "@features/user/types/user";
import { useUserService } from "@features/user/hooks/user-service";

import { useAlert } from "@components/feedback/use-alert";

export interface UseListUsers {
    data: User[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListUsers() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useUserService();

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

    const loader = useLoader<User[]>({
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

export default useListUsers;