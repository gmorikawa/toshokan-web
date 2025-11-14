"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import {
    ColorModeProvider,
    type ColorModeProviderProps,
} from "./color-mode"

const themeConfig = {
    theme: {
        semanticTokens: {
            colors: {
                primary: {
                    solid: { value: "{colors.green.600}" },
                    fg: { value: "{colors.green.700}" },
                    muted: { value: "{colors.green.500}" },
                    subtle: { value: "{colors.green.100}" },
                    emphasized: { value: "{colors.green.300}" },
                    contrast: { value: "{colors.white}" },
                    focusRing: { value: "{colors.green.500}" },
                },
                secondary: {
                    solid: { value: "{colors.purple.600}" },
                    fg: { value: "{colors.purple.700}" },
                    muted: { value: "{colors.purple.500}" },
                    subtle: { value: "{colors.purple.100}" },
                    emphasized: { value: "{colors.purple.300}" },
                    contrast: { value: "{colors.white}" },
                    focusRing: { value: "{colors.purple.500}" },
                },
            },
        },
    },
};

function ThemeProvider(props: ColorModeProviderProps) {

    const system = createSystem(
        defaultConfig,
        defineConfig(themeConfig)
    );

    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    )
}

export { ThemeProvider };
export default ThemeProvider;