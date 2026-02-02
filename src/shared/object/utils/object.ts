import type { Nullable } from "@shared/object/types/nullable";

export type PropertyPath = string;

export function hasProperty<Entity extends object>(
    obj: Entity,
    propertyPath: PropertyPath
) {
    const navigate = (
        currentObj: object,
        paths: string[],
        pathIndex: number
    ): boolean => {
        const pathKey = paths[pathIndex];

        if (Object.keys(currentObj).find(key => key === pathKey)) {
            return true;
        } else if (pathIndex < paths.length - 1) {
            return navigate(
                (currentObj as any)[pathKey],
                paths,
                pathIndex + 1
            );
        }

        return false;
    };

    return navigate(obj, propertyPath.split("."), 0);
}

export function getValueByPath<Value, Entity extends object>(
    obj: Entity,
    path: PropertyPath
): Nullable<Value> | undefined {
    const keys = path.split(".");

    let current: any = obj;

    for (const key of keys) {
        if (current == null) {
            return undefined;
        }
        current = current[key];
    }

    return current;
}

export function setValueByPath<Value, Entity extends object>(
    obj: Entity,
    path: PropertyPath,
    value: Value,
): Entity {
    const keys = path.split(".");

    return changeField<Value, Entity>(obj, keys, 0, value);
}

function changeField<Value, Entity extends object>(
    currentObj: Entity,
    paths: string[],
    pathIndex: number,
    value: Value
): Entity {
    const pathKey = paths[pathIndex];

    if (Object.keys(currentObj).find(key => key === pathKey)) {
        if (pathIndex < paths.length - 1) {
            return {
                ...currentObj,
                [pathKey]: changeField(
                    (currentObj as any)[pathKey],
                    paths,
                    pathIndex + 1,
                    value
                )
            };
        }

        return {
            ...currentObj,
            [pathKey]: value
        }
    } else {
        return currentObj;
    }
}
