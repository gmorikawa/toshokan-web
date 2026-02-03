import { useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";
import type {
    // FilterCriteria,
    FilterMetadata,
    // FilterOperator,
    Filters
} from "@shared/search/types/filter";
// import { hasProperty } from "@shared/object/utils/object";

export interface FilterConfiguration {
    initialFilters?: Filters;
}

export interface FilterController {
    filters: Filters;
    // updateFilter: <Key extends keyof Entity>(path: Key, operator: FilterOperator, value: Nullable<Entity[Key]>) => void;
    updateFilter: <Value>(name: string, value: Nullable<Value>) => void;
    resetFilters: () => void;
}

export function useFilter(
    configuration: FilterConfiguration
): FilterController {
    const [filters, setFilters] = useState<Filters>(configuration.initialFilters ?? []);

    const updateFilter = <Value>(
        name: string,
        value: Nullable<Value>
    ): void => {
        setFilters((previousState: Filters) => {
            return previousState.map((metadata: FilterMetadata) => {
                if (metadata.name === name)
                    return { value, name };
                return metadata;
            });
        });
    };

    const resetFilters = (): void => {
        setFilters(configuration.initialFilters ?? []);
    };

    return {
        filters,
        updateFilter,
        resetFilters
    };
}
