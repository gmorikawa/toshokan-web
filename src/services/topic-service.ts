import type { NewTopic, Topic } from "@/entities/topic";
import MainService, { type Service } from "@/services";

export class TopicService extends MainService implements Service {
    async getAll(): Promise<Topic[]> {
        return this.http.get<Topic[]>("/api/topics");
    }

    async getById(id: string): Promise<Topic> {
        return this.http.get<Topic>(`/api/topics/${id}`);
    }

    async create(topic: NewTopic): Promise<Topic> {
        const body = topic;
        return this.http.post<Topic>("/api/topics", { body });
    }

    async update(topic: Topic): Promise<Topic> {
        const body = topic;
        return this.http.patch<Topic>(`/api/topics/${topic.id}`, { body });
    }

    async remove(topic: Topic): Promise<void> {
        return this.http.delete<void>(`/api/topics/${topic.id}`);
    }
}

export default TopicService;