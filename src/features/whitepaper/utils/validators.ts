import * as z from "zod";

export const whitepaperValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    title: z.string().min(1, "Title is required"),
    summary: z.string().optional(),
    language: z.object({}, { error: "Language is required" }),
    authors: z.array(z.any()).optional(),
    topics: z.array(z.any()).optional(),
    organization: z.any().optional()
});

export const newWhitepaperValidator = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().optional(),
    language: z.any().optional(),
    authors: z.array(z.any()).optional(),
    topics: z.array(z.any()).optional(),
    organization: z.any().optional()
});
