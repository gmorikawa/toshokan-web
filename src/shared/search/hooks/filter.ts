import { useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";
import type {
    FilterCriteria,
    FilterOperator,
    Filters
} from "@shared/search/types/filter";
import { hasProperty } from "@shared/object/utils/object";

export interface FilterConfiguration<Entity extends Object = any> {
    initialFilters?: Filters<Entity>;
}

export interface FilterController<Entity extends Object = any> {
    filters: Filters<Entity>;
    updateFilter: <Key extends keyof Entity>(path: Key, operator: FilterOperator, value: Nullable<Entity[Key]>) => void;
    resetFilters: () => void;
}

export function useFilter<Entity extends Object = any>(
    configuration: FilterConfiguration<Entity>
): FilterController<Entity> {
    const [filters, setFilters] = useState<Filters<Entity>>(configuration.initialFilters ?? {});

    const updateFilter = <Key extends keyof Entity>(
        path: Key,
        operator: FilterOperator,
        value: Nullable<Entity[Key]>
    ): void => {
        hasProperty(filters, path as string);

        setFilters((previousState: Filters<Entity>) => {
            return {
                ...previousState,
                [path]: previousState[path]!
                    .map((condition: FilterCriteria<Entity[Key]>) => {
                        if (condition.operator === operator) {
                            return { ...condition, value: value };
                        }
                        return condition;
                    })
            }
        });
    };

    const resetFilters = (): void => {
        setFilters(configuration.initialFilters ?? {});
    };

    return {
        filters,
        updateFilter,
        resetFilters
    };
}
