import * as z from "zod";

export const publisherValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional()
});
