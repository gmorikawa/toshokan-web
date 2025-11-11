import { useEffect, useRef } from "react";

type Key = 'Enter';
type KeyCombination = Key[];

interface UseKeyboard {
    controller: React.Ref<HTMLElement>;
}

interface UseKeyboardConfiguration {
    keys: Key | KeyCombination;
    onKeyPress(): void;
}

function validateConfiguration(configuration: UseKeyboardConfiguration) {
    if (!Boolean(configuration.keys) || !Boolean(configuration.onKeyPress)) {
        throw new Error("'keys' and 'onKeyPress' must be defined.");
    }
}

function useKeyboard<Element extends HTMLElement>(configuration: UseKeyboardConfiguration): UseKeyboard {
    validateConfiguration(configuration);

    const controller = useRef<Element>(null);

    useEffect(
        () => {
            const element = controller.current;

            if (element !== null) {
                const handleKeyPress = (e: KeyboardEvent) => {
                    if (!Array.isArray(configuration.keys) && e.code === configuration.keys) {
                        configuration.onKeyPress();
                    }
                };

                element.addEventListener("keydown", handleKeyPress)

                return () => {
                    element.removeEventListener("keydown", handleKeyPress);
                };
            }
        },
        []
    );

    return { controller };
}

export { useKeyboard };
export type { UseKeyboard };
export default useKeyboard;