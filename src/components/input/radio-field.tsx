import {
    RadioCard,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

export interface RadioItem {
    value: string;
    label: string;
    description?: string;
}

export interface RadioFieldProps extends ThemeProps {
    label: string;
    property: string;
    options: RadioItem[];
    value?: string;
    placeholder?: string;
    required?: boolean;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function RadioField({ label, property, options, value, onChange, palette }: RadioFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    return (
        <RadioCard.Root id={property} value={value} colorPalette={palette ?? "primary"} onChange={handleChange} size="sm">
            <RadioCard.Label>{label}</RadioCard.Label>

            {options.map((item: RadioItem) => (
                <RadioCard.Item key={item.value} value={item.value}>
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                        <RadioCard.ItemContent>
                            <RadioCard.ItemText>
                                {item.label}
                            </RadioCard.ItemText>

                            {item?.description && (
                                <RadioCard.ItemDescription>
                                    {item.description}
                                </RadioCard.ItemDescription>
                            )}
                        </RadioCard.ItemContent>
                        <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                </RadioCard.Item>
            ))}
        </RadioCard.Root>
    );
}

export default RadioField;
