import { useEffect, useState } from "react";

import { usePagination } from "@shared/pagination";
import type { Pagination } from "@/common/pagination";

import type { Author } from "@features/author/types/author";

import { useAlert } from "@components/feedback/use-alert";
import { useAuthorService } from "./author-service";

type Milliseconds = number;
type Name = string;
type Boolean = boolean;

export interface AuthorSearchController {
    data: Author[];
    pagination: Pagination;

    search(fullname: string): void;
    create(): void;
    reset(): void;
}

export interface AuthorSearchConfiguration {
    debounceTime?: Milliseconds;
    defaultFullname?: Name;

    errorAlert?: Boolean;
}

export function useAuthorSearch(configuration?: AuthorSearchConfiguration): AuthorSearchController {
    const debounceTime = configuration?.debounceTime ?? 500;
    const defaultFullname = configuration?.defaultFullname ?? "";
    const errorAlert = configuration?.errorAlert ?? false;

    const service = useAuthorService();
    const [fullname, setFullname] = useState<Name>(defaultFullname);
    const [data, setData] = useState<Author[]>([]);

    const alert = useAlert();
    const pagination = usePagination();

    const search = async (fullname?: string) => {
        setFullname(fullname || "");
    };

    const reset = () => {
        search(undefined);
    };

    const create = () => {
        service.create({ fullname })
            .then((result: Author) => {
                setData([result, ...data]);
            })
            .catch((error: Error) => {
                if (errorAlert) {
                    alert.showErrorMessage(error);
                }
            });
    };

    useEffect(() => {
        const newTimer = setTimeout(() => {
            service.getAll({ fullname, pagination })
                .then((result) => {
                    setData(result);
                })
                .catch((error: Error) => {
                    if (!errorAlert) {
                        alert.showErrorMessage(error);
                    }
                });
        }, debounceTime);

        return () => clearTimeout(newTimer);
    }, [fullname, pagination.page, pagination.size]);
    return {
        data,
        pagination,
        search,
        create,
        reset
    };
}

export default useAuthorSearch;
