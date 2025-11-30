import type { Document } from "@/types/models/document";
import type { NewDocumentFile } from "@/types/models/document-file";

import useForm from "@/components/form/use-form";
import type { ModalController } from "@/components/modal/use-modal";

import ActionButton from "@/components/button/action-button";
import FlexContainer from "@/components/container/flex-container";
import FormFileField from "@/components/form/form-file-field";
import FormNumericField from "@/components/form/form-numeric-field";
import FormTextField from "@/components/form/form-text-field";
import Modal from "@/components/modal/modal";
import Paragraph from "@/components/typography/paragraph";
import StackContainer from "@/components/container/stack-container";

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
            version: "",
            description: "",
            publishingYear: null,
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
                    label="Version"
                    property="version"
                />

                <FormTextField
                    form={form}
                    label="Description"
                    property="description"
                />

                <FormNumericField
                    form={form}
                    label="Publishing Year"
                    property="publishingYear"
                />

                <FormFileField
                    form={form}
                    property="binary"
                />
            </StackContainer>
        </Modal>
    );
}

export default UploadModal;
