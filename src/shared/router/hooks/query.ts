import { useSearchParams } from "react-router-dom";

export function useQuery<Query extends Object>(): Query {
    const [searchParams] = useSearchParams();
    const query: any = {};

    searchParams.forEach((value, key) => {
        query[key] = value;
    });

    return query as Query;
}