import * as z from "zod";

export const newPublisherValidator = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional()
});
