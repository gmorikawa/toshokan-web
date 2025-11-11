type Value = string | number | boolean | null;

interface UseLocalStorage {
    get(key: string): Promise<Value>;
    set(key: string, value: Value): Promise<void>;
}


function useLocalStorage(): UseLocalStorage {
    const get = async (key: string): Promise<Value> => {
        const serializedValue = localStorage.get(key);
        return serializedValue && JSON.parse(serializedValue);
    };

    const set = async (key: string, value: Value): Promise<void> => {
        return localStorage.set(key, value && JSON.stringify(value));
    };

    return { get, set };
}

export { useLocalStorage };
export type { UseLocalStorage };
export default useLocalStorage;