import { useEffect, useState } from "react";

import type { Author } from "@/types/models/author";
import type { Category } from "@/types/models/category";
import type { Language } from "@/types/models/language";
import type { Publisher } from "@/types/models/publisher";
import type { Topic } from "@/types/models/topic";
import BookTypeUtil from "@/types/util/book-type.util";

import AuthorService from "@/services/author-service";
import CategoryService from "@/services/category-service";
import LanguageService from "@/services/language-service";
import PublisherService from "@/services/publisher-service";
import TopicService from "@/services/topic-service";
import useService from "@/services/use-service";
import useAlert from "@/components/feedback/use-alert";

import type { Form } from "@/components/form/use-form";
import FormComboField from "@/components/form/form-combo-field";
import FormRadioField from "@/components/form/form-radio-field";
import FormSelectField from "@/components/form/form-select-field";
import FormTextField from "@/components/form/form-text-field";
import StackContainer from "@/components/container/stack-container";
import SubmitButton from "@/components/button/submit-button";

export interface BookFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function BookForm<Entity>({ form, onSubmit }: BookFormProps<Entity>) {
    const alert = useAlert();
    const languageService = useService<LanguageService>(LanguageService, { includeAuthorization: true });
    const categoryService = useService<CategoryService>(CategoryService, { includeAuthorization: true });
    const publisherService = useService<PublisherService>(PublisherService, { includeAuthorization: true });
    const authorService = useService<AuthorService>(AuthorService, { includeAuthorization: true });
    const topicService = useService<TopicService>(TopicService, { includeAuthorization: true });

    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    const [languages, setLanguages] = useState<Language[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);

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
        categoryService.getAll()
            .then((response: Category[]) => {
                setCategories(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, []);

    useEffect(() => {
        publisherService.getAll()
            .then((response: Publisher[]) => {
                setPublishers(response);
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

    return (
        <StackContainer spacing={4}>
            <FormRadioField
                form={form}
                label="Type"
                property="type"
                options={BookTypeUtil.getMetadata().map(({ label, type }) => ({ label: label, value: type }))}
            />

            <FormTextField
                form={form}
                label="Title"
                property="title"
                required
            />

            <FormTextField
                form={form}
                label="Subtitle"
                property="subtitle"
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
                label="Category"
                property="category"
                placeholder="Select a category"
                options={categories}
                getLabel={(category: Category) => category.name}
                getValue={(category: Category) => category.id}
            />

            <FormSelectField
                form={form}
                label="Publisher"
                property="publisher"
                placeholder="Select a publisher"
                options={publishers}
                getLabel={(publisher: Language) => publisher.name}
                getValue={(publisher: Language) => publisher.id}
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}

export default BookForm;
