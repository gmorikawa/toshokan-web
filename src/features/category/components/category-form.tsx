import type { Form } from "@components/form/use-form";
import { FormTextField } from "@components/form/form-text-field";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";

export interface CategoryFormProps<Entity> {
    form: Form<Entity>;

    onSubmit?: (entity: Entity) => void;
}

export function CategoryForm<Entity>({
    form,
    onSubmit
}: CategoryFormProps<Entity>) {
    const handleSubmit = (): void => {
        (onSubmit) && (onSubmit(form.entity));
    };

    return (
        <StackContainer spacing={4}>
            <FormTextField
                form={form}
                label="Name"
                property="name"
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}
