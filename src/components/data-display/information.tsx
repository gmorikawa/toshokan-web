import { DataList } from "@chakra-ui/react";

export interface InformationProps {
    children?: React.ReactNode;
}

export function InformationContainer({ children }: InformationProps) {
    return (
        <DataList.Root>
            {children}
        </DataList.Root>
    );
}

export interface InformationItemProps {
    label: string;
    children?: React.ReactNode;
}

export function InformationItem({ label, children }: InformationItemProps) {
    return (
        <DataList.Item>
            <DataList.ItemLabel fontWeight="bold">{label}</DataList.ItemLabel>
            <DataList.ItemValue>{children}</DataList.ItemValue>
        </DataList.Item>
    );
}

export default { Container: InformationContainer, Item: InformationItem };
