import { useEffect, useState } from "react";
import useAuthorSearch from "@/features/author/hooks/use-author-search";
import useTopicSearch from "@/features/topic/hooks/use-topic-search";

import type { Book } from "@/types/models/book";
import type { Author } from "@/types/models/author";
import type { Category } from "@/types/models/category";
import type { Language } from "@/types/models/language";
import type { Publisher } from "@/types/models/publisher";
import type { Topic } from "@/types/models/topic";
import BookTypeUtil from "@/types/util/book-type.util";

import CategoryService from "@/services/category-service";
import LanguageService from "@/services/language-service";
import PublisherService from "@/services/publisher-service";
import useService from "@/services/use-service";
import useAlert from "@/components/feedback/use-alert";

import type { Form } from "@/components/form/use-form";
import FormComboField from "@/components/form/form-combo-field";
import FormRadioField from "@/components/form/form-radio-field";
import FormSelectField from "@/components/form/form-select-field";
import FormTextField from "@/components/form/form-text-field";
import StackContainer from "@/components/container/stack-container";
import SubmitButton from "@/components/button/submit-button";
import { FormTextareaField } from "@/components/form/form-textarea-field";

export interface BookFormProps {
    form: Form<Book>;
    onSubmit?(entity: Book): void;
}

export function BookForm({ form, onSubmit }: BookFormProps) {
    const alert = useAlert();
    const languageService = useService<LanguageService>(LanguageService, { includeAuthorization: true });
    const categoryService = useService<CategoryService>(CategoryService, { includeAuthorization: true });
    const publisherService = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const authors = useAuthorSearch();
    const topics = useTopicSearch();

    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    const [languages, setLanguages] = useState<Language[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);

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
                onChange={(value: Author[]) => {
                    authors.reset();
                    form.onChange("authors", value);
                }}
                onInput={authors.search}
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
                onChange={(value: Topic[]) => {
                    topics.reset();
                    form.onChange("topics", value);
                }}
                onInput={topics.search}
            />

            <FormComboField
                form={form}
                label="Category"
                property="category"
                placeholder="Select a category"
                options={categories}
                getLabel={(category: Category) => category.name}
                getValue={(category: Category) => category.id}
            />

            <FormComboField
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
