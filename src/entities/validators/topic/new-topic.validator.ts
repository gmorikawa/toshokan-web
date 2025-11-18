import * as z from "zod";

export const newTopicValidator = z.object({
    name: z.string().min(1, "Topic name is required")
});