"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import {
    ColorModeProvider,
    type ColorModeProviderProps,
} from "./color-mode"

function ThemeProvider(props: ColorModeProviderProps) {

    const config = defineConfig({
        theme: {
            tokens: {
                colors: {},
            },
        },
    })

    const system = createSystem(defaultConfig, config)

    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    )
}

export { ThemeProvider };
export default ThemeProvider;