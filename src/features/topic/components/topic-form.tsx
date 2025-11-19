import SubmitButton from "@/components/button/submit-button";
import StackContainer from "@/components/container/stack-container";
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
        <StackContainer spacing={4}>
            <FormTextField
                form={form}
                label="Name"
                property="name"
                required
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}

export default TopicForm;
