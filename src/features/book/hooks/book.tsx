import { useEffect, useState } from "react";

import type { Book } from "@features/book/types/book";

import useAlert from "@components/feedback/use-alert";
import { useBookService } from "./book-service";

export interface UseBookResult {
    book: Book | null;
}

export function useBook(id: string) {
    const service = useBookService();
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