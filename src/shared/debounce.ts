import { useEffect } from "react";

export type DebounceDelayMilliseconds = number;
export type DebounceFunction = () => void;

export interface DebounceConfiguration {
    action: DebounceFunction;
    delay?: DebounceDelayMilliseconds;
    dependencies?: any[];
}

export function useDebounce(configuration: DebounceConfiguration): void {
    if (!configuration?.action) {
        throw new Error("useDebounce: 'action' configuration is required.");
    }

    const action = configuration.action;
    const delay = configuration?.delay || 500;
    const dependencies = configuration?.dependencies || [];

    useEffect(() => {
        const newTimer = setTimeout(() => {
            action();
        }, delay);

        return () => {
            clearTimeout(newTimer);
        };
    }, dependencies);
}

export default useDebounce;