import type { URLBuilder } from "@shared/http/utils/url-builder";
import type { FilterMetadata, Filters } from "@shared/search/types/filter";

export function appendFiltersToURL(
    url: URLBuilder,
    filters?: Filters
): URLBuilder {
    if (!filters) {
        return url;
    }

    filters
        .forEach((metadata: FilterMetadata) => {
            if (metadata.value === null || metadata.value === undefined) {
                return;
            }

            url.appendQuery(
                metadata.name,
                metadata.value.toString()
            );
        });

    return url;
}
