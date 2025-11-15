import {
    createListCollection,
    Select,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

export interface SelectFieldProps<Entity> extends ThemeProps {
    label: string;
    property: string;
    options: Entity[];
    value?: Entity;
    placeholder?: string;
    required?: boolean;

    getValue(entity: Entity): string;
    getLabel(entity: Entity): string;

    onChange?(value: Entity): void;
}

export function SelecteField<Entity>({ label, property, options, value, placeholder, getValue, getLabel, onChange, palette }: SelectFieldProps<Entity>) {
    const handleChange = ({ items }: { items: Entity[], value: string[] }): void => {
        (onChange) && (onChange(items[0]));
    };

    const collection = createListCollection({
        items: options,
        itemToString: getLabel,
        itemToValue: getValue,
    });

    return (
        <Select.Root
            collection={collection}
            id={property}
            value={value ? [getValue(value)] : []}
            colorPalette={palette ?? "primary"}
            onValueChange={handleChange}
        >
            <Select.HiddenSelect />
            <Select.Label>{label}</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                    <Select.ClearTrigger />
                </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
                <Select.Content>
                    {collection.items.map((option) => (
                        <Select.Item item={getValue(option)} key={getValue(option)}>
                            {getLabel(option)}
                            <Select.ItemIndicator>
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
}

export default SelecteField;
