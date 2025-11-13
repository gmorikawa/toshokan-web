import SubmitButton from "@/components/button/submit-button";
import BoxContainer from "@/components/container/box-container";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";

export interface LanguageFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function LanguageForm<Entity>({ form, onSubmit }: LanguageFormProps<Entity>) {
    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    return (
        <BoxContainer>
            <FormTextField
                form={form}
                label="Name"
                property="name"
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </BoxContainer>
    );
}

export default LanguageForm;
