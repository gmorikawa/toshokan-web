import { useEffect, useState } from "react";

export type FetchState = "idle" | "loading" | "error" | "success";

export interface ListLoaderConfiguration<Entity> {
    loadData: () => Promise<Entity[]>;
}

export interface ListLoader<Entity> {
    state: FetchState;
    data: Entity[];
    error: Error | undefined;

    reload: () => Promise<void>;
}

export function useListLoader<Entity>({ loadData }: ListLoaderConfiguration<Entity>): ListLoader<Entity> {
    const [state, setState] = useState<FetchState>("idle");
    const [data, setData] = useState<Entity[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);

    async function reload(): Promise<void> {
        setState("loading");
        setError(undefined);

        return loadData()
            .then((result: Entity[]) => {
                setData(result);
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

export default useListLoader;
