import type { UserRole, UserStatus } from "@/features/user/types/enums";
import type { ID } from "@shared/entity/types/id";

export interface LoggedUser {
    id: ID;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}