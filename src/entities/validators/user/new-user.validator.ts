import UserRoleUtil from "@/entities/util/user-role.util";
import UserStatusUtil from "@/entities/util/user-status.util";
import * as z from "zod";

export const newUserValidator = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    fullname: z.string().min(1, "Full name is required"),
    role: z.enum(UserRoleUtil.getAll()),
    status: z.enum(UserStatusUtil.getAll()),
});
