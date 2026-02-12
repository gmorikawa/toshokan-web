import { UserRoleUtil, UserStatusUtil } from "@features/user/utils/enums";
import * as z from "zod";

export const userValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    role: z.enum(UserRoleUtil.getAll()),
    status: z.enum(UserStatusUtil.getAll()),
    profile: z.object({
        fullname: z.string().optional(),
        biography: z.string().optional(),
    })
});

export const newUserValidator = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    role: z.enum(UserRoleUtil.getAll()),
    status: z.enum(UserStatusUtil.getAll()),
});
