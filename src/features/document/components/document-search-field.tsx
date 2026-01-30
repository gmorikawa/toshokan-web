import { SearchIcon } from "@shared/icons";

import { BoxContainer } from "@components/container/box-container";
import { TextField } from "@components/input/text-field";

export interface DocumentSearchFieldProps {
    query: string;
    onSearch?(query: string): void;
}

export function DocumentSearchField({ query, onSearch }: DocumentSearchFieldProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const query = event.target.value;
        onSearch?.(query);
    };

    return (
        <BoxContainer mb={4}>
            <TextField
                startIcon={<SearchIcon />}
                property="query"
                value={query}
                onChange={handleChange}
            />
        </BoxContainer>
    );
}
