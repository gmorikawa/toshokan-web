import { Tabs } from "@chakra-ui/react"

export interface TabContentProps<Tab> extends React.PropsWithChildren {
    tab: Tab;
}

export function TabContent<Tab extends string>({ tab, children }: TabContentProps<Tab>) {
    return (
        <Tabs.Content value={tab}>
            {children}
        </Tabs.Content>
    );
}

export default TabContent;