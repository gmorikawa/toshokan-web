export type UserRole = "ADMIN" | "LIBRARIAN" | "READER";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface User {
    id: string;
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