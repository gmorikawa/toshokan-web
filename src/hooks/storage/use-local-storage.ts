type Value = string | null;

interface UseLocalStorage {
    get(key: string): Promise<Value>;
    set(key: string, value: Value): Promise<void>;
}


function useLocalStorage(): UseLocalStorage {
    const get = async (key: string): Promise<Value> => {
        const serialized = localStorage.getItem(key);
        return serialized && JSON.parse(serialized);
    };

    const set = async (key: string, value: Value): Promise<void> => {
        return localStorage.setItem(key, value ? JSON.stringify(value) : '');
    };

    return { get, set };
}

export { useLocalStorage };
export type { UseLocalStorage };
export default useLocalStorage;