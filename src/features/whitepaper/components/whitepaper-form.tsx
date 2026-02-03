import type { BinaryFile } from "@shared/file/types/binary-file";
import { DownloadButton } from "@shared/application/components/download-button";
import { DeleteButton } from "@shared/application/components/delete-button";

import type { Form } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { FormComboField } from "@components/form/form-combo-field";
import { FormNumericField } from "@components/form/form-numeric-field";
import { FormSelectField } from "@components/form/form-select-field";
import { FormTextField } from "@components/form/form-text-field";
import { FormTextareaField } from "@components/form/form-textarea-field";
import { FormSection } from "@components/form/form-section";
import { Paragraph } from "@components/typography/paragraph";
import { StackContainer } from "@components/container/stack-container";
import { SubmitButton } from "@components/button/submit-button";

import type { NewWhitepaper, Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { Author } from "@features/author/types/author";
import type { Language } from "@features/language/types/language";
import type { Organization } from "@features/organization/types/organization";
import type { Topic } from "@features/topic/types/topic";
import type { DocumentFile, UploadDocumentFile } from "@features/document/types/document-file";
import type { WhitepaperFilesController } from "@features/whitepaper/hooks/whitepaper-files";
import type { WhitepaperFileUploadController } from "@features/whitepaper/hooks/whitepaper-file-upload";
import { useAuthorSearch } from "@features/author/hooks/author-search";
import { useLanguageSearch } from "@features/language/hooks/language-search";
import { useOrganizationSearch } from "@features/organization/hooks/organization-search";
import { useTopicSearch } from "@features/topic/hooks/topic-search";
import { FileDrop } from "@features/file/components/file-drop";
import { DocumentUploadFileList } from "@features/document/components/document-upload-file-list";
import { DocumentFileList } from "@features/document/components/document-file-list";


export interface WhitepaperFormProps {
    form: Form<Whitepaper | NewWhitepaper>;
    uploader: WhitepaperFileUploadController;
    files?: WhitepaperFilesController;

    onSubmit?: (entity: Whitepaper | NewWhitepaper) => void;
}

export function WhitepaperForm({
    form,
    uploader,
    files,

    onSubmit
}: WhitepaperFormProps) {

    const languages = useLanguageSearch();
    const organizations = useOrganizationSearch();
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
                                These are the files already associated with this whitepaper.
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
                                    No existing files associated with this whitepaper.
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
                            Provide the basic information about the whitepaper.
                        </Paragraph>
                    }
                >
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

                        <FormNumericField
                            form={form}
                            label="Publishing Year"
                            property="publishingYear"
                            placeholder="1997"
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
                            label="Organization"
                            property="organization"
                            placeholder="Select an organization"
                            options={organizations.data}
                            getLabel={(organization: Organization) => organization.name}
                            getValue={(organization: Organization) => organization.id}
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
