import { useState } from "react";
import type z from "zod";

type ErrorDetails = {
    code: string;
    inclusive: boolean;
    message: string;
    path: string[];
}

export interface ValidatorResult<Entity> {
    errors: Record<string, string> | undefined;
    valid: boolean;
    validate(entity: Entity): boolean;
}

export function useValidator<Entity>(validationSchema?: z.ZodObject<any, any>): ValidatorResult<Entity> {
    const [errors, setErrors] = useState<Record<string, string>>();

    const valid = (!errors);

    const validate = (entity: Entity): boolean => {
        console.log(   "Validating entity:", entity);
        if (!validationSchema) {
            setErrors(undefined);
            return true;
        }

        const result = validationSchema.safeParse(entity);

        if (result.success) {
            setErrors(undefined);
            return true;
        } else {
            const newErrors: Record<string, string> = {};

            JSON
                .parse(result.error.message)
                .forEach((issue: ErrorDetails) => {
                    const path = issue.path.join(".");
                    newErrors[path] = issue.message;
                });

            console.info("Validation errors:", newErrors);
            setErrors(newErrors);
            return false;
        }
    };

    return { errors, valid, validate };
}

export default useValidator;
