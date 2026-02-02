import type { URLBuilder } from "@shared/http/utils/url-builder";
import type { Pagination } from "@shared/search/types/pagination";

export function appendPaginationToURL(
    url: URLBuilder,
    pagination?: Pagination
): URLBuilder {
    if (pagination) {
        return url
            .appendQuery("page", pagination.page.toString())
            .appendQuery("limit", pagination.limit.toString());
    }

    return url;
}
