import type { Form } from "@components/form/use-form";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { FormTextField } from "@components/form/form-text-field";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";

export interface AuthorFormProps<Entity> {
    form: Form<Entity>;

    onSubmit?: (entity: Entity) => void;
}

export function AuthorForm<Entity>({
    form,
    onSubmit
}: AuthorFormProps<Entity>) {
    const handleSubmit = (): void => {
        (onSubmit) && (onSubmit(form.entity));
    };

    return (
        <StackContainer spacing={4}>
            <FormTextField
                form={form}
                label="Full name"
                property="fullname"
            />

            <FormTextareaField
                form={form}
                label="Biography"
                property="biography"
                allowResize
                rows={10}
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}
