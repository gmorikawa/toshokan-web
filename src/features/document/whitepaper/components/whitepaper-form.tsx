import { useEffect, useState } from "react";

import type { Author } from "@/types/models/author";
import type { Language } from "@/types/models/language";
import type { Organization } from "@/types/models/organization";
import type { Topic } from "@/types/models/topic";

import useAlert from "@/components/feedback/use-alert";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";
import LanguageService from "@/services/language-service";
import OrganizationService from "@/services/organization-service";
import TopicService from "@/services/topic-service";

import type { Form } from "@/components/form/use-form";
import FormComboField from "@/components/form/form-combo-field";
import FormSelectField from "@/components/form/form-select-field";
import FormTextField from "@/components/form/form-text-field";
import SubmitButton from "@/components/button/submit-button";
import StackContainer from "@/components/container/stack-container";

export interface WhitepaperFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function WhitepaperForm<Entity>({ form, onSubmit }: WhitepaperFormProps<Entity>) {
    const alert = useAlert();
    const languageService = useService<LanguageService>(LanguageService, { includeAuthorization: true });
    const authorService = useService<AuthorService>(AuthorService, { includeAuthorization: true });
    const topicService = useService<TopicService>(TopicService, { includeAuthorization: true });
    const organizationService = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    const [languages, setLanguages] = useState<Language[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
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
        authorService.getAll()
            .then((response: Author[]) => {
                setAuthors(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, []);

    useEffect(() => {
        topicService.getAll()
            .then((response: Topic[]) => {
                setTopics(response);
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

            <FormTextField
                form={form}
                label="Summary"
                property="summary"
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
                options={authors}
                getLabel={(author: Author) => author.fullname}
                getValue={(author: Author) => author.id}
                multiple
            />

            <FormComboField
                form={form}
                label="Topics"
                property="topics"
                options={topics}
                getLabel={(topic: Topic) => topic.name}
                getValue={(topic: Topic) => topic.id}
                multiple
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
