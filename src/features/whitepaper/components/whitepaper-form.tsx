import type { Form } from "@components/form/use-form";
import { FormComboField } from "@components/form/form-combo-field";
import { FormSelectField } from "@components/form/form-select-field";
import { FormTextField } from "@components/form/form-text-field";
import { SubmitButton } from "@components/button/submit-button";
import { StackContainer } from "@components/container/stack-container";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { FormNumericField } from "@components/form/form-numeric-field";

import type { NewWhitepaper, Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { Author } from "@features/author/types/author";
import type { Language } from "@features/language/types/language";
import type { Organization } from "@features/organization/types/organization";
import type { Topic } from "@features/topic/types/topic";
import { useAuthorSearch } from "@features/author/hooks/author-search";
import { useLanguageSearch } from "@features/language/hooks/language-search";
import { useOrganizationSearch } from "@features/organization/hooks/organization-search";
import { useTopicSearch } from "@features/topic/hooks/topic-search";

export interface WhitepaperFormProps {
    form: Form<Whitepaper | NewWhitepaper>;

    onSubmit?: (entity: Whitepaper | NewWhitepaper) => void;
}

export function WhitepaperForm({
    form,
    onSubmit
}: WhitepaperFormProps) {

    const languages = useLanguageSearch();
    const organizations = useOrganizationSearch();
    const authors = useAuthorSearch();
    const topics = useTopicSearch();

    const handleSubmit = (): void => {
        (onSubmit) && (onSubmit(form.entity));
    };

    return (
        <StackContainer spacing={4}>
            <FormTextField
                form={form}
                label="Title"
                property="title"
            />

            <FormTextareaField
                form={form}
                label="Summary"
                property="summary"
                allowResize
                rows={10}
            />

            <FormSelectField
                form={form}
                label="Language"
                property="language"
                placeholder="Select a language"
                options={languages.data}
                getLabel={(language: Language) => language.name}
                getValue={(language: Language) => language.id}
            />

            <FormComboField
                form={form}
                label="Authors"
                property="authors"
                placeholder="Select authors"
                options={authors.data}
                getLabel={(author: Author) => author.fullname}
                getValue={(author: Author) => author.id}
                multiple
                allowCreate
                onChange={(value: Author[]) => {
                    authors.changeFilter("fullname", value);
                    form.onChange("authors", value);
                }}
                onInput={(value: string) => {
                    authors.changeFilter("fullname", value);
                }}
                onCreate={() => {
                    // authors.create();
                }}
            />

            <FormComboField
                form={form}
                label="Topics"
                property="topics"
                placeholder="Select topics"
                options={topics.data}
                getLabel={(topic: Topic) => topic.name}
                getValue={(topic: Topic) => topic.id}
                multiple
                allowCreate
                onChange={(value: Topic[]) => {
                    topics.changeFilter("name", value);
                    form.onChange("topics", value);
                }}
                onInput={(value: string) => {
                    topics.changeFilter("name", value);
                }}
                onCreate={() => {
                    // topics.create();
                }}
            />

            <FormSelectField
                form={form}
                label="Organization"
                property="organization"
                placeholder="Select an organization"
                options={organizations.data}
                getLabel={(organization: Organization) => organization.name}
                getValue={(organization: Organization) => organization.id}
            />

            <FormNumericField
                form={form}
                label="Publishing Year"
                property="publishingYear"
                placeholder="1997"
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}
