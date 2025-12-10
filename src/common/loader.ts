export type FetchState = "idle" | "loading" | "error" | "success";

export interface Loader {
    state: FetchState;
}