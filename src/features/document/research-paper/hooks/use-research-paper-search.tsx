import type { ResearchPaper } from "@/types/models/research-paper";
import type { Count, Pagination } from "@/common/pagination";

import { useEffect, useState } from "react";
import useAlert from "@/components/feedback/use-alert";
import useService from "@/services/use-service";

import useDebounce, { type DebounceDelayMilliseconds } from "@/hooks/use-debounce";
import useLoader, { type LoaderController } from "@/hooks/use-loader";
import usePagination, { type PaginationController } from "@/hooks/use-pagination";

import ResearchPaperService from "@/services/research-paper-service";

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

    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });
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
