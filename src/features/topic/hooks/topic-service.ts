import { useSession } from "@features/auth/hooks/session";
import type { Topic, NewTopic } from "@features/topic/types/topic";
import { countAllTopics,
    createTopic,
    deleteTopic,
    getAllTopics,
    getTopicById,
    updateTopic
} from "@features/topic/utils/api";
import type { TopicQueryOptions } from "@features/topic/types/query";

export interface TopicService {
    getAll(query?: TopicQueryOptions): Promise<Topic[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Topic>;
    create(topic: NewTopic): Promise<Topic>;
    update(topic: Topic): Promise<Topic>;
    delete(topic: Topic): Promise<boolean>;
}

export function useTopicService(): TopicService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: TopicQueryOptions) => getAllTopics(session, query),
        getById: async (id: string) => getTopicById(session, id),
        countAll: async () => countAllTopics(session),
        create: async (topic: NewTopic) => createTopic(session, topic),
        update: async (topic: Topic) => updateTopic(session, topic.id, topic),
        delete: async (topic: Topic) => deleteTopic(session, topic.id)
    }
}
