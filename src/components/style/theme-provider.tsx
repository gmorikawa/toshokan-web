import { ChakraProvider } from "@chakra-ui/react"
import {
    ColorModeProvider,
    type ColorModeProviderProps,
} from "./color-mode"
import themeConfig from "@/config/theme";

export function ThemeProvider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={themeConfig}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    )
}

export default ThemeProvider;