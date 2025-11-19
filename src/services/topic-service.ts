import type { NewTopic, Topic } from "@/entities/models/topic";
import type { QueryOptions } from "@/entities/query";
import MainService, { type Service } from "@/services";

export class TopicService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<Topic[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Topic[]>(`/api/topics?${queryString}`);
        }

        return this.http.get<Topic[]>("/api/topics");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/topics/count");
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