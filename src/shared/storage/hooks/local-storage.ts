type Value = string | null;

export interface UseLocalStorage {
    get(key: string): Value;
    set(key: string, value: Value): void;
}


export function useLocalStorage(): UseLocalStorage {
    const get = (key: string): Value => {
        const serialized = localStorage.getItem(key);
        return serialized && JSON.parse(serialized);
    };

    const set = (key: string, value: Value): void => {
        return localStorage.setItem(key, value ? JSON.stringify(value) : '');
    };

    return { get, set };
}
