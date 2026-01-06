import { useState } from "react";

import type { Count, Page, Pagination, Size } from "@/common/pagination";

export interface PaginationController extends Pagination {
    update(page: Page, size?: Size, count?: Count): void;
}

export function usePagination(): PaginationController {
    const [page, setPage] = useState<Page>(1);
    const [size, setSize] = useState<Size>(10);
    const [count, setCount] = useState<Count>(0);

    const update = (page: Page, size?: Size, count?: Count): void => {
        setPage(page);

        if (size !== undefined) {
            setSize(size);
        }

        if (count !== undefined) {
            setCount(count);
        }
    };

    return {
        page,
        size,
        count,
        update,
    }
}

export default usePagination;