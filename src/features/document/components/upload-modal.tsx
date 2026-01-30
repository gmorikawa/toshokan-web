import type { ModalController } from "@components/modal/use-modal";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { FlexContainer } from "@components/container/flex-container";
import { FormFileField } from "@components/form/form-file-field";
import { FormTextField } from "@components/form/form-text-field";
import { Modal } from "@components/modal/modal";
import { Paragraph } from "@components/typography/paragraph";
import { StackContainer } from "@components/container/stack-container";

import type { Document } from "@features/document/types/document";
import type { NewDocumentFile } from "@features/document/types/document-file";

export interface UploadModalProps {
    controller: ModalController;
    document: Document;

    onUpload?: (documentFile: NewDocumentFile) => void;
}

export function UploadModal({ controller, document, onUpload }: UploadModalProps) {
    const form = useForm<NewDocumentFile>({
        default: {
            document: document,
            file: null,
            description: "",
            binary: null,
        }
    });

    function handleUpload(): void {
        (onUpload) && (onUpload(form.entity));
    }

    return (
        <Modal
            controller={controller}
            footer={(
                <FlexContainer justify="flex-end" spacing={2}>
                    <ActionButton variant="outline" onClick={controller.close}>Close</ActionButton>
                    <ActionButton onClick={handleUpload}>Save</ActionButton>
                </FlexContainer>
            )}
        >
            <StackContainer spacing={4}>
                <Paragraph>{form.entity.document.title}</Paragraph>

                <FormTextField
                    form={form}
                    label="Description"
                    property="description"
                />

                <FormFileField
                    form={form}
                    property="binary"
                />
            </StackContainer>
        </Modal>
    );
}
