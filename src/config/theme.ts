import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customTheme = {
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
                danger: {
                    solid: { value: "{colors.red.600}" },
                    fg: { value: "{colors.red.700}" },
                    muted: { value: "{colors.red.500}" },
                    subtle: { value: "{colors.red.100}" },
                    emphasized: { value: "{colors.red.300}" },
                    contrast: { value: "{colors.white}" },
                    focusRing: { value: "{colors.red.500}" },
                },
                warning: {
                    solid: { value: "{colors.yellow.500}" },
                    fg: { value: "{colors.yellow.600}" },
                    muted: { value: "{colors.yellow.400}" },
                    subtle: { value: "{colors.yellow.100}" },
                    emphasized: { value: "{colors.yellow.300}" },
                    contrast: { value: "{colors.black}" },
                    focusRing: { value: "{colors.yellow.400}" },
                },
                info: {
                    solid: { value: "{colors.blue.600}" },
                    fg: { value: "{colors.blue.700}" },
                    muted: { value: "{colors.blue.500}" },
                    subtle: { value: "{colors.blue.100}" },
                    emphasized: { value: "{colors.blue.300}" },
                    contrast: { value: "{colors.white}" },
                    focusRing: { value: "{colors.blue.500}" },
                },
            },
        },
    },
};

export const themeConfig = createSystem(
    defaultConfig,
    defineConfig(customTheme)
);

export default themeConfig;