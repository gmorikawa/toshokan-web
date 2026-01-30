import type { Form } from "@components/form/use-form";
import { FormTextField } from "@components/form/form-text-field";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";

export interface BundleFormProps<Entity> {
    form: Form<Entity>;

    onSubmit?: (entity: Entity) => void;
}

export function BundleForm<Entity>({
    form,
    onSubmit
}: BundleFormProps<Entity>) {
    const handleSubmit = (): void => {
        (onSubmit) && (onSubmit(form.entity));
    };

    return (
        <StackContainer spacing={4}>
            <FormTextField
                form={form}
                label="Title"
                property="title"
                required
            />

            <FormTextareaField
                form={form}
                label="Description"
                property="description"
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}
