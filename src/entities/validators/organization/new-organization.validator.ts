import OrganizationTypeUtil from "@/entities/util/organization-type.util";
import * as z from "zod";

export const newOrganizationValidator = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    type: z.enum(OrganizationTypeUtil.getAll(), { message: "Invalid organization type" })
});
