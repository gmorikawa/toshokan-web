import type { UserRole, UserStatus } from "@/features/user/types/enums";

export interface LoggedUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}