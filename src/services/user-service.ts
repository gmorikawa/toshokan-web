import type { NewUser, User } from "@/features/user/types/user";
import type { QueryOptions } from "@/types/query";
import MainService, { type Service } from "@/services";

export class UserService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<User[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<User[]>(`/api/users?${queryString}`);
        }

        return this.http.get<User[]>("/api/users");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/users/count");
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
