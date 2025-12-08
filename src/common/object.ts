export function removeNullishProperties<T>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            result[key] = obj[key];
        }
    }
    return result;
}