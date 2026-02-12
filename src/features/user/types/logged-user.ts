import type { ID } from "@shared/entity/types/id";

import type { UserRole, UserStatus } from "@/features/user/types/enums";
import type { UserProfile } from "@features/user/types/user";

export interface LoggedUser {
    id: ID;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    profile: UserProfile;
}
