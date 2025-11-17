export type ColorPalette = "primary" | "secondary" | "danger" | "warning" | "success" | "info";

export interface ThemeProps {
    palette?: ColorPalette;
}