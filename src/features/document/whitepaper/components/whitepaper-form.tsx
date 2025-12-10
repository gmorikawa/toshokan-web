import { useEffect, useState } from "react";
import useAuthorSearch from "@/features/author/hooks/use-author-search";
import useTopicSearch from "@/features/topic/hooks/use-topic-search";

import type { NewWhitepaper, Whitepaper } from "@/features/document/whitepaper/types/whitepaper";
import type { Author } from "@/features/author/types/author";
import type { Language } from "@/features/language/types/language";
import type { Organization } from "@/features/organization/types/organization";
import type { Topic } from "@/features/topic/types/topic";

import useAlert from "@/components/feedback/use-alert";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";
import OrganizationService from "@/services/organization-service";

import type { Form } from "@/components/form/use-form";
import FormComboField from "@/components/form/form-combo-field";
import FormSelectField from "@/components/form/form-select-field";
import FormTextField from "@/components/form/form-text-field";
import SubmitButton from "@/components/button/submit-button";
import StackContainer from "@/components/container/stack-container";
import { FormTextareaField } from "@/components/form/form-textarea-field";

export interface WhitepaperFormProps {
    form: Form<Whitepaper | NewWhitepaper>;
    onSubmit?(entity: Whitepaper | NewWhitepaper): void;
}

export function WhitepaperForm({ form, onSubmit }: WhitepaperFormProps) {
    const alert = useAlert();
    const languageService = useService<LanguageService>(LanguageService, { includeAuthorization: true });
    const organizationService = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    const authors = useAuthorSearch();
    const topics = useTopicSearch();

    const [languages, setLanguages] = useState<Language[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        languageService.getAll()
            .then((response: Language[]) => {
                setLanguages(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, []);

    useEffect(() => {
        organizationService.getAll()
            .then((response: Organization[]) => {
                setOrganizations(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, []);

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
                options={languages}
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
                    authors.reset();
                    form.onChange("authors", value);
                }}
                onInput={authors.search}
                onCreate={() => {
                    authors.create();
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
                    topics.reset();
                    form.onChange("topics", value);
                }}
                onInput={topics.search}
                onCreate={() => {
                    topics.create();
                }}
            />

            <FormSelectField
                form={form}
                label="Organization"
                property="organization"
                placeholder="Select an organization"
                options={organizations}
                getLabel={(organization: Organization) => organization.name}
                getValue={(organization: Organization) => organization.id}
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}

export default WhitepaperForm;
