"use client"

import { Portal } from "@chakra-ui/react"
import Alert from "../components/feedback/alert";

export function AlertProvider() {
    return (
        <Portal>
            <Alert />
        </Portal>
    )
}

export default AlertProvider;
