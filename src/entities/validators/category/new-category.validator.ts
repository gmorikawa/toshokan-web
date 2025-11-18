import * as z from "zod";

export const newCategoryValidator = z.object({
    name: z.string().min(1, "Category name is required")
});
