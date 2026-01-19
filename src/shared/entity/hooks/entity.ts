import useAlert from "@components/feedback/alert/controller";
import type { Nullable } from "@shared/object/types/nullable";
import { useEffect, useState } from "react";

export interface EntityController<T> {
    entity: Nullable<T>;

    reload(): Promise<void>;
}

export function useEntity<T>(
    fetchEntity: () => Promise<T>,
    dependencies: any[]
): EntityController<T> {
    const [entity, setEntity] = useState<Nullable<T>>(null);
    const alert = useAlert();

    const reload = async (): Promise<void> => {
        fetchEntity()
            .then((fetchedEntity: T) => {
                setEntity(fetchedEntity);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
                setEntity(null);
            });
    };

    useEffect(() => {
        reload();
    }, dependencies);

    return {
        entity,
        reload
    }
}