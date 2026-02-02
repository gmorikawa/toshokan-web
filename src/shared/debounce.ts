import { useEffect } from "react";

export type DebounceDelayMilliseconds = number;
export type DebounceFunction = () => void;

export function useDebounce(
    action: DebounceFunction,
    delay: DebounceDelayMilliseconds = 300,
    dependencies?: unknown[]
): void {
    useEffect(() => {
        const newTimer = setTimeout(() => {
            action();
        }, delay);

        return () => {
            clearTimeout(newTimer);
        };
    }, dependencies);
}
