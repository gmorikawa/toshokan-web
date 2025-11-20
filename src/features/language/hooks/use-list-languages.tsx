import type { Language } from "@/entities/models/language";

import { useEffect } from "react";
import type { Pagination } from "@/entities/query";
import { useListLoader, type ListLoader } from "@/hooks/list/use-list-loader";

import useAlert from "@/hooks/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

export interface UseListLanguages extends ListLoader<Language[]> {
    pagination: Pagination;
}

export function useListLanguages() {
    const alert = useAlert();
    const pagination = usePagination();
    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });

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

    const loader = useListLoader<Language>({
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

export default useListLanguages;
