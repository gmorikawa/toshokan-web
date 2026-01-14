import type { QueryOptions } from "@shared/search/types/query";
import { useSession } from "@features/auth/hooks/session";
import type { User, NewUser } from "@features/user/types/user";
import { countAllUsers,
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
} from "@features/user/utils/api";

export interface UserService {
    getAll(query?: QueryOptions): Promise<User[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<User>;
    create(user: NewUser): Promise<User>;
    update(user: User): Promise<User>;
    delete(user: User): Promise<boolean>;
}

export function useUserService(): UserService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: QueryOptions) => getAllUsers(session, query),
        getById: async (id: string) => getUserById(session, id),
        countAll: async () => countAllUsers(session),
        create: async (user: NewUser) => createUser(session, user),
        update: async (user: User) => updateUser(session, user.id, user),
        delete: async (user: User) => deleteUser(session, user.id)
    }
}
