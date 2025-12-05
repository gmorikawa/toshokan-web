import * as z from "zod";

export const newBundleValidator = z.object({
    title: z.string().min(1, "Bundle title is required"),
    description: z.string()
});
