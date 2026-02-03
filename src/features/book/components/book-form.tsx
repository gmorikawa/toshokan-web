import type { BinaryFile } from "@shared/file/types/binary-file";
import { DownloadButton } from "@shared/application/components/download-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import type { Form } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { FormComboField } from "@components/form/form-combo-field";
import { FormNumericField } from "@components/form/form-numeric-field";
import { FormRadioField } from "@components/form/form-radio-field";
import { FormSelectField } from "@components/form/form-select-field";
import { FormTextField } from "@components/form/form-text-field";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { FormSection } from "@components/form/form-section";
import { Paragraph } from "@components/typography/paragraph";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";

import type { Book, NewBook } from "@features/book/types/book";
import type { Author } from "@features/author/types/author";
import type { Category } from "@features/category/types/category";
import type { Language } from "@features/language/types/language";
import type { Publisher } from "@features/publisher/types/publisher";
import type { Topic } from "@features/topic/types/topic";
import type { DocumentFile, UploadDocumentFile } from "@features/document/types/document-file";
import type { BookFileUploadController } from "@features/book/hooks/book-file-upload";
import type { BookFilesController } from "@features/book/hooks/book-files";
import { useAuthorSearch } from "@features/author/hooks/author-search";
import { useTopicSearch } from "@features/topic/hooks/topic-search";
import { useLanguageSearch } from "@features/language/hooks/language-search";
import { useCategorySearch } from "@features/category/hooks/category-search";
import { usePublisherSearch } from "@features/publisher/hooks/publisher-search";
import { BookTypeUtil } from "@features/book/utils/enums";
import { FileDrop } from "@features/file/components/file-drop";
import { DocumentUploadFileList } from "@features/document/components/document-upload-file-list";
import { DocumentFileList } from "@features/document/components/document-file-list";

export interface BookFormProps {
    form: Form<Book | NewBook>;
    uploader: BookFileUploadController;
    files?: BookFilesController;

    onSubmit?: (entity: Book | NewBook) => void;
}

export function BookForm({
    form,
    uploader,
    files,

    onSubmit
}: BookFormProps) {
    const authors = useAuthorSearch({
        pagination: {
            initialLimit: 3
        },
        filter: {
            initialFilters: [
                { name: "contains_fullname", value: null }
            ]
        }
    });
    const topics = useTopicSearch({
        pagination: {
            initialLimit: 3
        },
        filter: {
            initialFilters: [
                { name: "contains_name", value: null }
            ]
        }
    });
    const languages = useLanguageSearch();
    const categories = useCategorySearch();
    const publishers = usePublisherSearch();

    const handleSubmit = (): void => {
        (onSubmit) && (onSubmit(form.entity));
    };

    return (
        <FileDrop
            onFileDrop={(binary: BinaryFile) => uploader.addUploadFile(binary)}
        >
            <StackContainer spacing={8}>
                {(files) && (
                    <FormSection
                        title="Files"
                        subtitleSlot={
                            <Paragraph>
                                These are the files already associated with this book.
                            </Paragraph>
                        }
                    >
                        <DocumentFileList
                            files={files.data}
                            emptySlot={(
                                <Paragraph
                                    align="center"
                                    size="sm"
                                    color="gray"
                                    fontStyle="italic"
                                >
                                    No existing files associated with this book.
                                </Paragraph>
                            )}
                            actionsSlot={(documentFile: DocumentFile) => (
                                <BoxContainer
                                    display="flex"
                                    gap={2}
                                >
                                    <DeleteButton
                                        onClick={() => files.handleRemove(documentFile)}
                                    />

                                    <DownloadButton
                                        onClick={() => files.handleDownload(documentFile)}
                                    />

                                </BoxContainer>
                            )}
                        />
                    </FormSection>
                )}

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
                    title="Detailed Information"
                    subtitleSlot={
                        <Paragraph>
                            Provide more detailed information about the book.
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
                                authors.resetFilters();
                                form.onChange("authors", value);
                            }}
                            onInput={(value: string) => {
                                authors.changeFilter(
                                    "contains_fullname",
                                    value !== "" ? value : null
                                );
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
                                topics.resetFilters();
                                form.onChange("topics", value);
                            }}
                            onInput={(value: string) => {
                                topics.changeFilter(
                                    "contains_name",
                                    value !== "" ? value : null
                                );
                            }}
                            onCreate={() => {
                                // topics.create();
                            }}
                        />

                        <FormSelectField
                            form={form}
                            label="Category"
                            property="category"
                            placeholder="Select a category"
                            options={categories.data}
                            getLabel={(category: Category) => category.name}
                            getValue={(category: Category) => category.id}
                        />

                        <FormSelectField
                            form={form}
                            label="Publisher"
                            property="publisher"
                            placeholder="Select a publisher"
                            options={publishers.data}
                            getLabel={(publisher: Publisher) => publisher.name}
                            getValue={(publisher: Publisher) => publisher.id}
                        />
                    </StackContainer>
                </FormSection>

                <FormSection
                    title="Files to Upload"
                    subtitleSlot={
                        <Paragraph>
                            Drop files anywhere on the form to add them to the upload list.
                        </Paragraph>
                    }
                >
                    <DocumentUploadFileList
                        uploadFiles={uploader.files}
                        emptySlot={(
                            <Paragraph
                                align="center"
                                size="sm"
                                color="gray"
                                fontStyle="italic"
                            >
                                No files added for upload.
                            </Paragraph>
                        )}
                        actionsSlot={(_: UploadDocumentFile, index: number) => (
                            <DeleteButton
                                size="sm"
                                onClick={() => uploader.removeUploadFile(index)}
                            />
                        )}
                    />
                </FormSection>

                <SubmitButton onSubmit={handleSubmit}>
                    Submit
                </SubmitButton>
            </StackContainer>
        </FileDrop>
    );
}
