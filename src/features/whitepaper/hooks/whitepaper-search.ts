import { useEffect, useState } from "react";

import type { Count, Pagination } from "@shared/search/types/pagination";
import { useDebounce, type DebounceDelayMilliseconds } from "@shared/debounce";
import { useLoader, type LoaderController } from "@shared/loader";
import { usePagination, type PaginationController } from "@shared/search/hooks/pagination";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

import { useAlert } from "@components/feedback/alert/controller";

type Query = string;
type Boolean = boolean;

export interface WhitepaperSearchController {
    query: string;
    data: Whitepaper[];

    pagination: PaginationController;
    loader: LoaderController<Whitepaper[]>;

    changePage(page: number): void;
    search(title: string): void;
    refresh(): void;
    reset(): void;
}

export interface WhitepaperSearchConfiguration {
    debounceTime?: DebounceDelayMilliseconds;
    defaultTitle?: Query;

    errorAlert?: Boolean;
}

export function useWhitepaperSearch(configuration?: WhitepaperSearchConfiguration): WhitepaperSearchController {
    const debounceTime = configuration?.debounceTime ?? 500;
    const defaultTitle = configuration?.defaultTitle ?? "";
    const errorAlert = configuration?.errorAlert ?? false;

    const service = useWhitepaperService();
    const [title, setTitle] = useState<Query>(defaultTitle);

    const loader = useLoader<Whitepaper[]>({
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
        loader.load(title, pagination);
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

export default useWhitepaperSearch;
