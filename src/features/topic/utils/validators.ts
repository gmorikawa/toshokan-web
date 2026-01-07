import * as z from "zod";

export const topicValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    name: z.string().min(1, "Topic name is required")
});

export const newTopicValidator = z.object({
    name: z.string().min(1, "Topic name is required")
});
