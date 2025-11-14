import type { NewUser, User } from "@/entities/models/user";
import MainService, { type Service } from "@/services";

export class UserService extends MainService implements Service {
    async getAll(): Promise<User[]> {
        return this.http.get<User[]>("/api/users");
    }

    async getById(id: string): Promise<User> {
        return this.http.get<User>(`/api/users/${id}`);
    }

    async create(user: NewUser): Promise<User> {
        const body = user;
        return this.http.post<User>("/api/users", { body });
    }

    async update(user: User): Promise<User> {
        const body = user;
        return this.http.patch<User>(`/api/users/${user.id}`, { body });
    }

    async remove(user: User): Promise<void> {
        return this.http.delete<void>(`/api/users/${user.id}`);
    }
}

export default UserService;
