import { useEffect, useState } from "react";

export type FetchState = "idle" | "loading" | "error" | "success";

export interface LoaderConfiguration<Entity> {
    loadData: () => Promise<Entity>;
}

export interface Loader<Entity> {
    state: FetchState;
    data: Entity | undefined;
    error: Error | undefined;

    reload: () => Promise<void>;
}

export function useLoader<Entity>({ loadData }: LoaderConfiguration<Entity>): Loader<Entity> {
    const [state, setState] = useState<FetchState>("idle");
    const [data, setData] = useState<Entity | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    async function reload(): Promise<void> {
        setState("loading");
        setError(undefined);

        return loadData()
            .then((entity: Entity) => {
                setData(entity);
                setState("success");
            })
            .catch((error: Error) => {
                setError(error);
                setState("error");
            });
    };

    useEffect(() => {
        reload();
    }, []);
    return {
        state,
        data,
        error,
        reload
    };
}

export default useLoader;
