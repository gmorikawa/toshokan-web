import type { QueryOptions } from "@/types/query";

import { useSession } from "@features/auth/hooks/session";
import type { Publisher, NewPublisher } from "@features/publisher/types/publisher";
import { countAllPublishers,
    createPublisher,
    deletePublisher,
    getAllPublishers,
    getPublisherById,
    updatePublisher
} from "@features/publisher/utils/api";

export interface PublisherService {
    getAll(query?: QueryOptions): Promise<Publisher[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Publisher>;
    create(publisher: NewPublisher): Promise<Publisher>;
    update(publisher: Publisher): Promise<Publisher>;
    delete(publisher: Publisher): Promise<boolean>;
}

export function usePublisherService(): PublisherService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: QueryOptions) => getAllPublishers(session, query),
        getById: async (id: string) => getPublisherById(session, id),
        countAll: async () => countAllPublishers(session),
        create: async (publisher: NewPublisher) => createPublisher(session, publisher),
        update: async (publisher: Publisher) => updatePublisher(session, publisher.id, publisher),
        delete: async (publisher: Publisher) => deletePublisher(session, publisher.id)
    }
}
