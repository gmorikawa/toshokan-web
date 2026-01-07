import * as z from "zod";

import { OrganizationTypeUtil } from "@features/organization/utils/enums";

export const organizationValidator = z.object({
    id: z.uuid({ message: "Invalid or undefined ID" }),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    type: z.enum(OrganizationTypeUtil.getAll(), { message: "Invalid organization type" })
});

export const newOrganizationValidator = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    type: z.enum(OrganizationTypeUtil.getAll(), { message: "Invalid organization type" })
});
