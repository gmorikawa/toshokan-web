export type NestedKeyOf<T extends Object> = {
    [K in keyof T & (string | number)]: T[K] extends Object
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
}[keyof T & (string | number)];
