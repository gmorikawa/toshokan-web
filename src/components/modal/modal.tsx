import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ModalController } from "./use-modal";

export interface ModalProps extends React.PropsWithChildren {
    controller: ModalController;

    onOpen?: () => void;
    onClose?: () => void;

    footer?: React.ReactNode;
}

export function Modal({ controller, onOpen, onClose, footer, children }: ModalProps) {
    function handleOpenChange(details: { open: boolean }) {
        if (details.open) {
            controller.open();
            (onOpen) && (onOpen());
        } else {
            controller.close();
            (onClose) && (onClose());
        }
    }

    return (
        <Dialog.Root open={controller?.isOpen} size="lg" onOpenChange={handleOpenChange}>
            <Dialog.Trigger asChild>
                <Button variant="outline">
                    {controller.triggerLabel}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                {controller.title}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {children}
                        </Dialog.Body>
                        <Dialog.Footer>
                            {footer}
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default Modal;