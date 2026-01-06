export interface UseCookies {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
}

export function useCookies(): UseCookies {
    const get = async <T>(key: string): Promise<T | null> => {
        return cookieStore.get(key)
            .then((result) => {
                return (result != null)
                    ? result?.value as T
                    : null;
            });
    };

    const set = async <T>(key: string, value: T): Promise<void> => {
        if (typeof value == "string" || typeof value == "number" || typeof value == "boolean") {
            return cookieStore.set(key, value.toString());
        } else {
            return cookieStore.set(key, JSON.stringify(value));
        }
    };

    return { get, set };
}

export default useCookies;