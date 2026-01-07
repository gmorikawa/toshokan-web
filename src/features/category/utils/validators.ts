import * as z from "zod";

export const categoryValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    name: z.string().min(1, "Category name is required")
});

export const newCategoryValidator = z.object({
    name: z.string().min(1, "Category name is required")
});
