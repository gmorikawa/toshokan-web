import type { NewPublisher, Publisher } from "@/entities/models/publisher";
import MainService, { type Service } from "@/services";

export class PublisherService extends MainService implements Service {
    async getAll(): Promise<Publisher[]> {
        return this.http.get<Publisher[]>("/api/publishers");
    }

    async getById(id: string): Promise<Publisher> {
        return this.http.get<Publisher>(`/api/publishers/${id}`);
    }

    async create(publisher: NewPublisher): Promise<Publisher> {
        const body = publisher;
        return this.http.post<Publisher>("/api/publishers", { body });
    }

    async update(publisher: Publisher): Promise<Publisher> {
        const body = publisher;
        return this.http.patch<Publisher>(`/api/publishers/${publisher.id}`, { body });
    }

    async remove(publisher: Publisher): Promise<void> {
        return this.http.delete<void>(`/api/publishers/${publisher.id}`);
    }
}

export default PublisherService;
