import { Portal } from "@chakra-ui/react";

import { Alert } from "@components/feedback/alert/alert";

export function AlertProvider() {
    return (
        <Portal>
            <Alert />
        </Portal>
    );
}

export default AlertProvider;
