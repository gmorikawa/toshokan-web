import {
    Badge,
    Combobox,
    createListCollection,
    Portal,
    Wrap,
} from '@chakra-ui/react';
import { MdOutlineClose } from "react-icons/md";
import type { ThemeProps } from '..';
import { useState } from 'react';

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
    allowCreate?: boolean;
    emptyComponent?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    multiple?: boolean;

    getValue(entity: Entity): string;
    getLabel(entity: Entity): string;

    onChange?(value: Entity[]): void;
    onInput?(value: string): void;
    onCreate?(value: string): void;
}

export function ComboField<Entity>({
    label, property, options, value, emptyComponent, placeholder, multiple, allowCreate, getValue, getLabel, onChange, onInput, onCreate, palette
}: ComboFieldProps<Entity>) {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = ({ items }: { items: Entity[], value: string[] }): void => {
        (onChange) && (onChange(items.filter(item => item)));
    };

    const handleInput = (details: InputValueChangeDetails): void => {
        if (details?.reason === "input-change") {
            setInputValue(details.inputValue);
            (onInput) && (onInput(details.inputValue));
        }
    };

    const handleRemoveItem = (item: Entity): void => {
        if (value) {
            const newValue = value.filter(i => getValue(i) !== getValue(item));
            (onChange) && (onChange(newValue));
        }
    };

    const handleCreateItem = (): void => {
        (onCreate) && (onCreate(inputValue));
    };

    const collection = createListCollection({
        items: options,
        itemToString: getLabel,
        itemToValue: getValue,
    });

    const isNew = allowCreate
        && inputValue.trim().length > 0
        && !options.find((item) => getLabel(item).toLowerCase() === inputValue.toLowerCase());

    return (
        <Combobox.Root
            id={property}
            name={property}
            value={value ? value.map(item => getValue(item)) : []}
            multiple={multiple}
            closeOnSelect
            openOnClick
            collection={collection}
            colorPalette={palette ?? "primary"}
            onValueChange={handleChange}
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
                        {isNew && (
                            <Combobox.Item item="[[new]]" onClick={handleCreateItem} fontStyle="italic">
                                Create "{inputValue}"
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        )}

                        {collection?.items?.map((item: Entity) => (
                            <Combobox.Item key={getValue(item)} item={getValue(item)}>
                                {getLabel(item)}
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        ))}

                        <Combobox.Empty>
                            {emptyComponent ?? "No options available"}
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
