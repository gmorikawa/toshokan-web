import type { UserStatus } from "../../features/user/types/user";

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

export default UserStatusUtil;