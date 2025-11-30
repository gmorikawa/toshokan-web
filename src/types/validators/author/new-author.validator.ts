import * as z from "zod";

export const newAuthorValidator = z.object({
    fullname: z.string().min(1, "Author full name is required"),
    biography: z.string().optional()
});
