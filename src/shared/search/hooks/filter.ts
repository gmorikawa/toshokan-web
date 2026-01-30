import { useState } from "react";

import type { Filters } from "@shared/search/types/filter";
import { setValueByPath } from "@shared/object/utils/object";

export interface FilterConfiguration {

}

export interface FilterController<Entity extends Object> {
    filters: Filters<Entity>;
    updateFilter: <Value>(path: string, value: Value) => void;
    resetFilters: () => void;
}

export function useFilter<Entity extends Object>(
    configuration?: FilterConfiguration
): FilterController<Entity> {
    const [filters, setFilters] = useState<Filters<Entity>>({});

    const updateFilter = <Value>(path: string, value: Value): void => {
        setFilters((previousState: Filters<Entity>) => {
            return setValueByPath<Value, Filters<Entity> | any>(previousState, path, value);
        });
    };

    const resetFilters = (): void => {
        
    };

    return {
        filters,
        updateFilter,
        resetFilters
    };
}
