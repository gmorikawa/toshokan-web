import { useEffect, useState } from "react";

import type { Pagination } from "@shared/search/types/pagination";
import { usePagination } from "@shared/search/hooks/pagination";

import type { Topic } from "@features/topic/types/topic";
import { useTopicService } from "@features/topic/hooks/topic-service";

import { useAlert } from "@components/feedback/use-alert";

type Milliseconds = number;
type Name = string;
type Boolean = boolean;

export interface TopicSearchController {
    data: Topic[];
    pagination: Pagination;

    search(name: string): void;
    create(): void;
    reset(): void;
}

export interface TopicSearchConfiguration {
    debounceTime?: Milliseconds;
    defaultName?: Name;

    errorAlert?: Boolean;
}

export function useTopicSearch(configuration?: TopicSearchConfiguration): TopicSearchController {
    const debounceTime = configuration?.debounceTime ?? 500;
    const defaultName = configuration?.defaultName ?? "";
    const errorAlert = configuration?.errorAlert ?? false;

    const service = useTopicService();
    const [name, setName] = useState<Name>(defaultName);
    const [data, setData] = useState<Topic[]>([]);

    const alert = useAlert();
    const pagination = usePagination();

    const search = async (name?: string) => {
        setName(name || "");
    };

    const reset = () => {
        search(undefined);
    };

    const create = () => {
        service.create({ name })
            .then((result: Topic) => {
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
            service.getAll({ name, pagination })
                .then((result) => {
                    setData(result);
                })
                .catch((error: Error) => {
                    if (errorAlert) {
                        alert.showErrorMessage(error);
                    }
                });
        }, debounceTime);

        return () => clearTimeout(newTimer);
    }, [name, pagination.page, pagination.size]);
    return {
        data,
        pagination,
        search,
        create,
        reset
    };
}

export default useTopicSearch;
