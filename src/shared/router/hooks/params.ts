import { useParams as useReactRouterParams } from "react-router";

type RouteParams<Params> = Params;

export function useParams<Params = any>(): RouteParams<Params> {
    return useReactRouterParams() as Params;
}
