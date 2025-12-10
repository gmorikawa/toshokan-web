import type { User } from "@/types/models/user";
import type { Count, Pagination } from "@/common/pagination";
import type { Loader } from "@/common/loader";

import useAlert from "@/components/feedback/use-alert";
import usePagination from "@/hooks/use-pagination";
import useLoader from "@/hooks/use-loader";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

export interface UseListUsers {
    data: User[];
    pagination: Pagination;
    loader: Loader;

    refresh(): void;
}

export function useListUsers() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<UserService>(UserService, { includeAuthorization: true });

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