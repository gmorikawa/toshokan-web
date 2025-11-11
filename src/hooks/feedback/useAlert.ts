import { toaster } from "@/components/feedback/toaster-provider";

type AlertType = "success" | "error" | "loading" | "info";

interface UseAlert {
    showMessage(message: string, type: AlertType): void;

    showErrorMessage(error: Error): void;
}

interface UseAlertConfiguration {
    showInConsole?: boolean;
}

function useAlert(configuration?: UseAlertConfiguration): UseAlert {
    const showMessage = (message: string, type: AlertType): void => {
        toaster.create({
            description: message,
            type: type,
        });
    };

    const showErrorMessage = (error: Error): void => {
        showMessage(error?.message, "error");

        if (configuration?.showInConsole) {
            console.error(error);
        }
    };

    return { showMessage, showErrorMessage };
}

export { useAlert };
export type { UseAlert, AlertType };
export default useAlert;