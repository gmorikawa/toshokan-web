import { toaster } from "./alert";

export type AlertType = "success" | "error" | "loading" | "info";

export interface AlertController {
    showMessage(message: string, type: AlertType): void;

    showErrorMessage(error: Error): void;
}

export interface AlertConfiguration {
    showInConsole?: boolean;
}

function showMessage(message: string, type: AlertType): void {
    toaster.create({
        description: message,
        type: type,
    });
}

export function useAlert(configuration?: AlertConfiguration): AlertController {
    const showErrorMessage = (error: Error): void => {
        showMessage(error?.message, "error");

        if (configuration?.showInConsole) {
            console.error(error);
        }
    };

    return {
        showMessage,
        showErrorMessage
    };
}

export default useAlert;