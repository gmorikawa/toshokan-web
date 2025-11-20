import type { ResearchPaper } from "@/entities/models/research-paper";

import { useEffect } from "react";
import type { Pagination } from "@/entities/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/hooks/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

export interface UseListResearchPapers extends ListLoader<ResearchPaper[]> {
    pagination: Pagination;
}

export function useListResearchPapers() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });

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

    const loader = useListLoader<ResearchPaper>({
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

export default useListResearchPapers;
