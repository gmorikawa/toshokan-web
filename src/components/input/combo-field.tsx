import {
    Badge,
    Combobox,
    createListCollection,
    Portal,
    Wrap,
} from '@chakra-ui/react';
import { MdOutlineClose } from "react-icons/md";
import type { ThemeProps } from '..';

type InputValueChangeReason = "input-change" | "item-select" | "clear-trigger" | "script" | "interact-outside";
interface InputValueChangeDetails {
    inputValue: string;
    reason?: InputValueChangeReason | undefined;
}

export interface ComboFieldProps<Entity> extends ThemeProps {
    label: string;
    property: string;
    options: Entity[];
    value?: Entity[];
    emptyMessage?: string;
    placeholder?: string;
    required?: boolean;
    multiple?: boolean;

    getValue(entity: Entity): string;
    getLabel(entity: Entity): string;

    onChange?(value: Entity[]): void;
    onInput?(value: string): void;
}

export function ComboField<Entity>({
    label, property, options, value, emptyMessage, placeholder, multiple, getValue, getLabel, onChange, onInput, palette
}: ComboFieldProps<Entity>) {
    const handleChange = ({ items }: { items: Entity[], value: string[] }): void => {
        (onChange) && (onChange(items));
    };

    const handleInput = (details: InputValueChangeDetails): void => {
        if (details?.reason === "input-change") {
            (onInput) && (onInput(details.inputValue));
        }
    };

    const handleRemoveItem = (item: Entity): void => {
        if (value) {
            const newValue = value.filter(i => getValue(i) !== getValue(item));
            (onChange) && (onChange(newValue));
        }
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
            openOnClick
            onInputValueChange={handleInput}
        >
            <Combobox.Label>{label}</Combobox.Label>

            <Combobox.Control>
                <Combobox.Input placeholder={placeholder} />
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
                        <Combobox.Empty>
                            {emptyMessage ?? "No options available"}
                        </Combobox.Empty>
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>

            {multiple && (
                <Wrap gap="2">
                    {value?.map(item => (
                        <Badge key={getValue(item)}>
                            {getLabel(item)}
                            
                            <MdOutlineClose onClick={() => handleRemoveItem(item)} />
                        </Badge>
                    ))}
                </Wrap>
            )}
        </Combobox.Root>
    );
}

export default ComboField;
