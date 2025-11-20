import type { Book } from "@/entities/models/book";

import { useEffect } from "react";
import type { Pagination } from "@/entities/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/hooks/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

export interface UseListBooks extends ListLoader<Book[]> {
    pagination: Pagination;
}

export function useListBooks() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<BookService>(BookService, { includeAuthorization: true });

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

    const loader = useListLoader<Book>({
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

export default useListBooks;
