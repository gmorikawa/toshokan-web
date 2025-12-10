import SubmitButton from "@/components/button/submit-button";
import StackContainer from "@/components/container/stack-container";
import FormRadioField from "@/components/form/form-radio-field";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";
import type { User } from "@/features/user/types/user";

export interface UpdateUserFormProps {
    form: Form<User>;
    onSubmit?(entity: User): void;
}

export function UpdateUserForm({ form, onSubmit }: UpdateUserFormProps) {
    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    return (
        <StackContainer spacing={4}>
            <FormTextField form={form} label="Full Name" property="fullname" required />

            <FormTextField form={form} label="Username" property="username" required />

            <FormTextField form={form} label="Email" property="email" required />
            <FormRadioField
                form={form}
                label="Role"
                property="role"
                options={[
                    { label: "Admin", value: "ADMIN" },
                    { label: "Librarian", value: "LIBRARIAN" },
                    { label: "Reader", value: "READER" }
                ]}
                required
            />

            <FormRadioField
                form={form}
                label="Status"
                property="status"
                options={[
                    { label: "Active", value: "ACTIVE" },
                    { label: "Blocked", value: "BLOCKED" },
                ]}
                required
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}

export default UpdateUserForm;
