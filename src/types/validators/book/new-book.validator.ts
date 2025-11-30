import BookTypeUtil from "@/types/util/book-type.util";
import * as z from "zod";

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
