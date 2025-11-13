import SubmitButton from "@/components/button/submit-button";
import BoxContainer from "@/components/container/box-container";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";

export interface AuthorFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function AuthorForm<Entity>({ form, onSubmit }: AuthorFormProps<Entity>) {
    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    return (
        <BoxContainer>
            <FormTextField form={form} label="Full name" property="fullname" />
            <FormTextField form={form} label="Biography" property="biography" />

            <SubmitButton onSubmit={handleSubmit}>Submit</SubmitButton>
        </BoxContainer>
    );
}

export default AuthorForm;
