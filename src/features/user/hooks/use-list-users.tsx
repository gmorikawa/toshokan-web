import type { User } from "@/types/models/user";

import { useEffect } from "react";
import type { Pagination } from "@/types/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/components/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

export interface UseListUsers extends ListLoader<User[]> {
    pagination: Pagination;
}

export function useListUsers() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<UserService>(UserService, { includeAuthorization: true });

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

    const loader = useListLoader<User>({
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

export default useListUsers;