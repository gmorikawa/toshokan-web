import * as z from "zod";

export const bundleValidator = z.object({
    id: z.string().uuid({ message: "Invalid or undefined ID" }),
    title: z.string().min(1, "Bundle title is required"),
    description: z.string()
});
