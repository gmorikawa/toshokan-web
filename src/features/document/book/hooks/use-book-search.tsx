import type { Book } from "@/types/models/book";
import type { Count, Pagination } from "@/common/pagination";

import { useEffect, useState } from "react";
import useAlert from "@/components/feedback/use-alert";
import useService from "@/services/use-service";

import useDebounce, { type DebounceDelayMilliseconds } from "@/hooks/use-debounce";
import useLoader, { type LoaderController } from "@/hooks/use-loader";
import usePagination, { type PaginationController } from "@/hooks/use-pagination";

import BookService from "@/services/book-service";

type Query = string;
type Boolean = boolean;

export interface BookSearchController {
    query: string;
    data: Book[];

    pagination: PaginationController;
    loader: LoaderController<Book[]>;

    changePage(page: number): void;
    search(title: string): void;
    refresh(): void;
    reset(): void;
}

export interface BookSearchConfiguration {
    debounceTime?: DebounceDelayMilliseconds;
    defaultTitle?: Query;

    errorAlert?: Boolean;
}

export function useBookSearch(configuration?: BookSearchConfiguration): BookSearchController {
    const debounceTime = configuration?.debounceTime ?? 500;
    const defaultTitle = configuration?.defaultTitle ?? "";
    const errorAlert = configuration?.errorAlert ?? false;

    const service = useService<BookService>(BookService, { includeAuthorization: true });
    const [title, setTitle] = useState<Query>(defaultTitle);

    const loader = useLoader<Book[]>({
        loadFunction: async (title: Query, pagination: Pagination) => {
            return service.getAll({ title, pagination });
        },
        onError: (error: Error) => {
            if (errorAlert) {
                alert.showErrorMessage(error);
            }
        },
        preventAutoload: true,
    });

    const loadCount = () => {
        service.countAll()
            .then((count: Count) => {
                pagination.update(pagination.page, pagination.size, count);
            })
            .catch((error: Error) => {
                if (errorAlert) {
                    alert.showErrorMessage(error);
                }
            });
    };

    const alert = useAlert();
    const pagination = usePagination();

    const search = async (title?: string) => {
        setTitle(title || "");
    };

    const changePage = (page: number) => {
        pagination.update(page);
    };

    const refresh = () => {
        search(title);
    };

    const reset = () => {
        search(undefined);
    };

    useDebounce({
        action: () => {
            loader.load(title, pagination);
        },
        dependencies: [title, pagination.page, pagination.size],
        delay: debounceTime
    });

    useEffect(() => {
        loadCount();
    }, []);
    return {
        query: title,
        loader,
        data: loader.data || [],
        pagination,
        changePage,
        search,
        refresh,
        reset
    };
}

export default useBookSearch;
