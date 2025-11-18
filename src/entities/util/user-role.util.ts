import type { UserRole } from "../models/user";

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

export default UserRoleUtil;