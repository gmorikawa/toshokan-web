import * as z from "zod";

export const newLanguageValidator = z.object({
    name: z.string().min(1, "Language name is required")
});
