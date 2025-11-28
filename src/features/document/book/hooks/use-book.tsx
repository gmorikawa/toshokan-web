import { useEffect, useState } from "react";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import type { Book } from "@/entities/models/book";
import useAlert from "@/hooks/feedback/use-alert";

export interface UseBookResult {
    book: Book | null;
}

export function useBook(id: string) {
    const service = useService<BookService>(BookService, { includeAuthorization: true });
    const alert = useAlert();

    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        service.getById(id)
            .then((response: Book) => {
                setBook(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [id]);

    return {
        book
    };
}

export default useBook;