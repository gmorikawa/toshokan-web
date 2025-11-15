import {
    Badge,
    Combobox,
    createListCollection,
    Portal,
    Wrap,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

export interface ComboFieldProps<Entity> extends ThemeProps {
    label: string;
    property: string;
    options: Entity[];
    value?: Entity[];
    placeholder?: string;
    required?: boolean;
    multiple?: boolean;

    getValue(entity: Entity): string;
    getLabel(entity: Entity): string;

    onChange?(value: Entity[]): void;
}

export function ComboField<Entity>({ label, property, options, value, multiple, getValue, getLabel, onChange, palette }: ComboFieldProps<Entity>) {
    const handleChange = ({ items }: { items: Entity[], value: string[] }): void => {
        (onChange) && (onChange(items));
    };

    const collection = createListCollection({
        items: options,
        itemToString: getLabel,
        itemToValue: getValue,
    });

    return (
        <Combobox.Root
            id={property}
            name={property}
            multiple={multiple}
            closeOnSelect
            value={value ? value.map(item => getValue(item)) : []}
            collection={collection}
            onValueChange={handleChange}
            colorPalette={palette ?? "primary"}
        >
            <Combobox.Label>{label}</Combobox.Label>

            <Combobox.Control>
                <Combobox.Input />
                <Combobox.IndicatorGroup>
                    <Combobox.Trigger />
                </Combobox.IndicatorGroup>
            </Combobox.Control>

            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content>
                        {collection.items.map((item: Entity) => (
                            <Combobox.Item key={getValue(item)} item={getValue(item)}>
                                {getLabel(item)}
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        ))}
                        <Combobox.Empty>No skills found</Combobox.Empty>
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>

            <Wrap gap="2">
                {value?.map(item => <Badge key={getValue(item)}>{getLabel(item)}</Badge>)}
            </Wrap>
        </Combobox.Root>
    );
}

export default ComboField;
