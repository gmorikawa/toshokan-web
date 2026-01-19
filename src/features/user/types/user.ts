import type { UserRole, UserStatus } from "@features/user/types/enums";
import type { ID } from "@shared/entity/types/id";

export interface User {
    id: ID;
    username: string;
    password: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}

export interface NewUser {
    username: string;
    password: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}
