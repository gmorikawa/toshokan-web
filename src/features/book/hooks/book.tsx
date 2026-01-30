import type { ID } from "@shared/entity/types/id";
import type { EntityController } from "@shared/entity/hooks/entity";
import { useEntity } from "@shared/entity/hooks/entity";

import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";

export interface BookController extends EntityController<Book> { }

export function useBook(id: ID): BookController {
    const service = useBookService();

    return useEntity<Book>(
        () => service.getById(id),
        [id]
    );
}
