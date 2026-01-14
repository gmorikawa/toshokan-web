import { useEffect, useState } from "react";

import type { Count, Pagination } from "@shared/search/types/pagination";
import { useDebounce, type DebounceDelayMilliseconds } from "@shared/debounce";
import { useLoader, type LoaderController } from "@shared/loader";
import { usePagination, type PaginationController } from "@shared/search/hooks/pagination";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

import { useAlert } from "@components/feedback/use-alert";

type Query = string;
type Boolean = boolean;

export interface ResearchPaperSearchController {
    query: string;
    data: ResearchPaper[];

    pagination: PaginationController;
    loader: LoaderController<ResearchPaper[]>;

    changePage(page: number): void;
    search(title: string): void;
    refresh(): void;
    reset(): void;
}

export interface ResearchPaperSearchConfiguration {
    debounceTime?: DebounceDelayMilliseconds;
    defaultTitle?: Query;

    errorAlert?: Boolean;
}

export function useResearchPaperSearch(configuration?: ResearchPaperSearchConfiguration): ResearchPaperSearchController {
    const debounceTime = configuration?.debounceTime ?? 500;
    const defaultTitle = configuration?.defaultTitle ?? "";
    const errorAlert = configuration?.errorAlert ?? false;

    const service = useResearchPaperService();
    const [title, setTitle] = useState<Query>(defaultTitle);

    const loader = useLoader<ResearchPaper[]>({
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

export default useResearchPaperSearch;
