import { toaster } from "./alert";

export type AlertType = "success" | "error" | "loading" | "info";

export interface UseAlert {
    showMessage(message: string, type: AlertType): void;

    showErrorMessage(error: Error): void;
}

export interface UseAlertConfiguration {
    showInConsole?: boolean;
}

export function useAlert(configuration?: UseAlertConfiguration): UseAlert {
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

export default useAlert;