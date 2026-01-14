import { useCallback } from "react";

import { Box, Menu as MenuChakra, Portal } from "@chakra-ui/react";

export interface MenuItemGroupProps extends React.PropsWithChildren {
    title: string;
}

export function MenuItemGroup({ title, children }: MenuItemGroupProps) {
    return (
        <MenuChakra.ItemGroup>
            <MenuChakra.ItemGroupLabel>{title}</MenuChakra.ItemGroupLabel>
            {children}
        </MenuChakra.ItemGroup>
    );
}

export function MenuItemSeparator() {
    return <MenuChakra.Separator />;
}

export interface MenuItemProps {
    label: string;
    value: string;

    onClick?: () => void;
}

export function MenuItem({ label, value, onClick }: MenuItemProps) {
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    return (
        <MenuChakra.Item value={value} onClick={handleClick}>{label}</MenuChakra.Item>
    );
}

export interface MenuContainerProps extends React.PropsWithChildren { }

export function MenuContainer({ children }: MenuContainerProps) {
    return (
        <MenuChakra.Content>
            {children}
        </MenuChakra.Content>
    );
}

export interface MenuProps extends React.PropsWithChildren {
    menu: React.ReactNode;
}

export function Menu({ menu, children }: MenuProps) {
    return (
        <MenuChakra.Root positioning={{ placement: "top-end" }}>
            <MenuChakra.Trigger asChild>
                <Box>
                    {children}
                </Box>
            </MenuChakra.Trigger>
            <Portal>
                <MenuChakra.Positioner>
                    {menu}
                </MenuChakra.Positioner>
            </Portal>
        </MenuChakra.Root>
    );
}