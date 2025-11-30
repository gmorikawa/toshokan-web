import type { Author } from "@/types/models/author";

import { useEffect } from "react";
import type { Pagination } from "@/types/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/components/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

export interface UseListAuthors extends ListLoader<Author[]> {
    pagination: Pagination;
}

export function useListAuthors() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });

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

    const loader = useListLoader<Author>({
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

export default useListAuthors;
