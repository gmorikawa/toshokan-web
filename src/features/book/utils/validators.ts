import * as z from "zod";

import { BookTypeUtil } from "@features/book/utils/enums";

export const bookValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    title: z.string().min(1, "Title is required"),
    summary: z.string().optional(),
    language: z.any().optional(),
    authors: z.array(z.any()).optional(),
    topics: z.array(z.any()).optional(),
    category: z.any().optional(),
    publisher: z.any().optional(),
    type: z.enum(BookTypeUtil.getAll())
});

export const newBookValidator = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().optional(),
    language: z.any().optional(),
    authors: z.array(z.any()).optional(),
    topics: z.array(z.any()).optional(),
    category: z.any().optional(),
    publisher: z.any().optional(),
    type: z.enum(BookTypeUtil.getAll())
});
