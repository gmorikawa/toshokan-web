import type { File } from "@features/file/types/file";
import type { UserRole, UserStatus } from "@features/user/types/enums";
import type { ID } from "@shared/entity/types/id";

export interface UserProfile {
    fullname: string;
    biography: string;
    avatar: File | null;
}

export interface User {
    id: ID;
    username: string;
    password: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    profile: UserProfile;
}

export interface NewUser {
    username: string;
    password: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}
