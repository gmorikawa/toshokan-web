import type { UserRole } from "@features/user/types/user";
import type { UserStatus } from "@features/user/types/user";

export interface UserRoleMetadata {
    role: UserRole;
    label: string;
}

export class UserRoleUtil {
    static getMetadata(): UserRoleMetadata[] {
        return [
            { role: "ADMIN", label: "Admin" },
            { role: "LIBRARIAN", label: "Librarian" },
            { role: "READER", label: "Reader" },
        ];
    }

    static getAll(): UserRole[] {
        return UserRoleUtil.getMetadata().map((meta) => meta.role);
    }

    static getNameByRole(role: UserRole): string {
        return UserRoleUtil.getMetadata().find((meta) => meta.role === role)?.label || "Unknown";
    }
}

export interface UserStatusMetadata {
    status: UserStatus;
    label: string;
}

export class UserStatusUtil {
    static getMetadata(): UserStatusMetadata[] {
        return [
            { status: "ACTIVE", label: "Active" },
            { status: "BLOCKED", label: "Blocked" },
        ];
    }

    static getAll(): UserStatus[] {
        return UserStatusUtil.getMetadata().map((meta) => meta.status);
    }

    static getNameByStatus(status: UserStatus): string {
        return UserStatusUtil.getMetadata().find((meta) => meta.status === status)?.label || "Unknown";
    }
}
