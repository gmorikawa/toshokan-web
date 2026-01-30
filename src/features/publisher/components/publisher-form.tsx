import type { Form } from "@components/form/use-form";
import { FormTextField } from "@components/form/form-text-field";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";

export interface PublisherFormProps<Entity> {
    form: Form<Entity>;

    onSubmit?: (entity: Entity) => void;
}

export function PublisherForm<Entity>({
    form,
    onSubmit
}: PublisherFormProps<Entity>) {

    const handleSubmit = (): void => {
        (onSubmit) && (onSubmit(form.entity));
    };

    return (
        <StackContainer spacing={4}>
            <FormTextField
                form={form}
                label="Name"
                property="name"
                required
            />

            <FormTextareaField
                form={form}
                label="Description"
                property="description"
                allowResize
                rows={10}
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}
