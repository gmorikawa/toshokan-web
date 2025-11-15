import { useState } from "react";

export interface ModalController {
    title: string;
    triggerLabel: string;

    isOpen: boolean;
    toggle(): void;
    open(): void;
    close(): void;
}

export interface ModalConfiguration {
    title: string;
    triggerLabel: string;
    defaultOpen?: boolean;
}


export function useModal({ title, triggerLabel, defaultOpen }: ModalConfiguration): ModalController {
    const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

    function toggle(): void {
        setIsOpen(!open);
    }

    function open(): void {
        setIsOpen(true);
    }

    function close(): void {
        setIsOpen(false);
    }

    return { title, triggerLabel, isOpen, toggle, open, close };
}

export default useModal;