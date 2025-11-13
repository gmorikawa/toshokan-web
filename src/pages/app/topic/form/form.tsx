import SubmitButton from "@/components/button/submit-button";
import BoxContainer from "@/components/container/box-container";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";

export interface TopicFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function TopicForm<Entity>({ form, onSubmit }: TopicFormProps<Entity>) {
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

export default TopicForm;
