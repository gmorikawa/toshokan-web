import { Tabs } from "@chakra-ui/react"
import type { ThemeProps } from "..";

export interface TabOption<Tab> {
    tab: Tab;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

export interface TabControlProps<Tab> extends React.PropsWithChildren, ThemeProps {
    defaultTab: Tab;
    options: TabOption<Tab>[];
}

export function TabControl<Tab extends string>({ defaultTab, options = [], children, palette }: TabControlProps<Tab>) {
    return (
        <Tabs.Root defaultValue={defaultTab} colorPalette={palette ?? "primary"} variant="outline">
            <Tabs.List>
                {options.map((option: TabOption<Tab>) => (
                    <Tabs.Trigger key={option.tab} value={option.tab}>
                        {option?.icon}
                        {option.label}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            {children}
        </Tabs.Root>
    );
}

export default TabControl;