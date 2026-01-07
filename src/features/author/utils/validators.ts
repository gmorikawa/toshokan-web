import * as z from "zod";

export const authorValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    fullname: z.string().min(1, "Author full name is required"),
    biography: z.string().optional()
});

export const newAuthorValidator = z.object({
    fullname: z.string().min(1, "Author full name is required"),
    biography: z.string().optional()
});