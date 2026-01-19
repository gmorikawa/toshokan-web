import type { ID } from "@shared/entity/types/id";
import type { Entity } from "@shared/entity/types/entity";

export function getID<T extends Entity>(entity: T | ID): ID {
    if (typeof entity === "string") {
        return entity;
    }

    return entity.id;
}
