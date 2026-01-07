import * as z from "zod";

export const bundleValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    title: z.string().min(1, "Bundle title is required"),
    description: z.string()
});

export const newBundleValidator = z.object({
    title: z.string().min(1, "Bundle title is required"),
    description: z.string()
});
