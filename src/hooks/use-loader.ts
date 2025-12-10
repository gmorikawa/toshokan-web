import type { FetchState, Loader } from "@/common/loader";
import { useEffect, useState } from "react";

export interface LoaderConfiguration<Entity> {
    loadFunction: (...args: any[]) => Promise<Entity>;

    dependencies?: any[];
    preventAutoload?: boolean;

    onError?: (error: Error) => void;
    onSuccess?: (data: Entity) => void;
}

export interface LoaderController<Entity> extends Loader {
    data: Entity | undefined;
    error: Error | undefined;

    load(...args: any[]): Promise<void>;
}

export function useLoader<Entity>(configuration: LoaderConfiguration<Entity>): LoaderController<Entity> {
    const [state, setState] = useState<FetchState>("idle");
    const [data, setData] = useState<Entity | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    const load = async (...args: any[]): Promise<void> => {
        setState("loading");
        setError(undefined);

        return configuration.loadFunction(...args)
            .then((entity: Entity) => {
                setState("success");
                setData(entity);

                configuration.onSuccess?.(entity);
            })
            .catch((problem: Error) => {
                setState("error");
                setError(problem);

                configuration.onError?.(problem);
            });
    };

    useEffect(() => {
        if (!configuration?.preventAutoload) {
            load();
        }
    }, configuration?.dependencies || []);
    return {
        state,
        data,
        error,
        load
    };
}

export default useLoader;