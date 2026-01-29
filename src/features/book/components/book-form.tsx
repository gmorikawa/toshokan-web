import { useEffect, useState } from "react";

import { useAlert } from "@components/feedback/alert/controller";
import type { Form } from "@components/form/use-form";
import { FormComboField } from "@components/form/form-combo-field";
import { FormRadioField } from "@components/form/form-radio-field";
import { FormSelectField } from "@components/form/form-select-field";
import { FormTextField } from "@components/form/form-text-field";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { FormNumericField } from "@components/form/form-numeric-field";
import { FormSection } from "@components/form/form-section";
import { Paragraph } from "@components/typography/paragraph";

import type { Book, NewBook } from "@features/book/types/book";
import type { Author } from "@features/author/types/author";
import type { Category } from "@features/category/types/category";
import type { Language } from "@features/language/types/language";
import type { Publisher } from "@features/publisher/types/publisher";
import type { Topic } from "@features/topic/types/topic";
import { BookTypeUtil } from "@features/book/utils/enums";
import { useAuthorSearch } from "@features/author/hooks/author-search";
import { useTopicSearch } from "@features/topic/hooks/topic-search";
import { useLanguageService } from "@features/language/hooks/language-service";
import { useCategoryService } from "@features/category/hooks/category-service";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";

export interface BookFormProps {
    form: Form<Book | NewBook>;
    onSubmit?(entity: Book | NewBook): void;
}

export function BookForm({ form, onSubmit }: BookFormProps) {
    const alert = useAlert();
    const languageService = useLanguageService();
    const categoryService = useCategoryService();
    const publisherService = usePublisherService();

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
        <StackContainer spacing={8}>
            <FormSection
                title="Basic Information"
                subtitleSlot={
                    <Paragraph>
                        Provide the basic information about the book.
                    </Paragraph>
                }
            >
                <StackContainer spacing={4}>
                    <FormTextField
                        form={form}
                        label="Title"
                        property="title"
                        placeholder="The Art of Computer Programming"
                        required
                    />

                    <FormTextField
                        form={form}
                        label="Subtitle"
                        property="subtitle"
                        placeholder="Volume 1: Fundamental Algorithms"
                    />

                    <FormTextField
                        form={form}
                        label="Edition"
                        property="edition"
                        placeholder="First Edition"
                    />

                    <FormTextareaField
                        form={form}
                        label="Summary"
                        property="summary"
                        allowResize
                        rows={10}
                        placeholder="This book covers basic algorithms..."
                    />

                    <FormNumericField
                        form={form}
                        label="Publishing Year"
                        property="publishingYear"
                        placeholder="1968"
                    />
                </StackContainer>
            </FormSection>

            <FormSection
                title="Metadata Information"
                subtitleSlot={
                    <Paragraph>
                        Provide the metadata information about the book.
                    </Paragraph>
                }
            >
                <StackContainer spacing={4}>
                    <FormRadioField
                        form={form}
                        label="Type"
                        property="type"
                        options={BookTypeUtil.getMetadata().map(({ label, type }) => ({ label: label, value: type }))}
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
                        getLabel={(publisher: Publisher) => publisher.name}
                        getValue={(publisher: Publisher) => publisher.id}
                    />
                </StackContainer>
            </FormSection>

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}

export default BookForm;
