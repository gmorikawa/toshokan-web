import UserRoleUtil from "@/entities/util/user-role.util";
import UserStatusUtil from "@/entities/util/user-status.util";
import * as z from "zod";

export const userValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    fullname: z.string().min(1, "Full name is required"),
    role: z.enum(UserRoleUtil.getAll()),
    status: z.enum(UserStatusUtil.getAll()),
});
