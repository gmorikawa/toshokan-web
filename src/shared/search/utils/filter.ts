import type { URLBuilder } from "@shared/http/utils/url-builder";
import type { FilterCriteria, Filters } from "@shared/search/types/filter";

export function appendFiltersToURL<Entity extends Object>(
    url: URLBuilder,
    filters?: Filters<Entity>
): URLBuilder {
    if (!filters) {
        return url;
    }

    Object
        .entries(filters)
        .forEach(([key, criterias]) => {
            (criterias as FilterCriteria[])
                .filter(({ value }) => value !== undefined && value !== null)
                .forEach(({ operator, value }) => {
                    url.appendQuery(
                        key,
                        encodeURIComponent(`${operator}-${value.toString()}`)
                    );
                });
        });

    return url;
}
