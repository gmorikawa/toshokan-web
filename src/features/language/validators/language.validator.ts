import * as z from "zod";

export const languageValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    name: z.string().min(1, "Language name is required")
});
