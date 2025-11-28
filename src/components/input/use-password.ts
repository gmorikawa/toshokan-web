import { useState } from "react";

interface UsePassword {
    visible: boolean;

    toggleVisibility(): void;
}

function usePassword(): UsePassword {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = (): void => {
        setVisible(!visible);
    };

    return {
        visible,
        toggleVisibility
    };
}

export type { UsePassword };
export { usePassword };
export default usePassword;