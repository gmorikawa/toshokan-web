import { useReducer } from "react";

type PropertyPath = string;

interface Form<Entity = any> {
    entity: Entity;

    getValue<Field>(property: PropertyPath): Field;
    updateValue<Field>(property: PropertyPath, value: Field): void;
}

interface UseFormConfiguration<Entity> {
    default: Entity;
}

function validateConfiguration<Entity>(configuration: UseFormConfiguration<Entity>) {
    if (!configuration.default) {
        throw new Error("Form 'default' value is not defined.");
    }
}

function setByPath<Entity, Field>(state: Entity, property: PropertyPath, value: Field): Entity {
    const keys = property.split(".");

    function update(current: any, index: number): any {
        if (index === keys.length) {
            return value;
        }

        const key = keys[index];
        return {
            ...current,
            [key]: update(current[key], index + 1)
        };
    }

    return update(state, 0);
}

function getByPath<Entity, Field>(state: Entity, property: PropertyPath): Field {
    const keys = property.split(".");
    let current: any = state;

    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }

    return current[keys[keys.length - 1]];
}

interface DispatchAction<Field> {
    property: PropertyPath;
    value: Field;
}

function useForm<Entity extends object = any>(configuration: UseFormConfiguration<Entity>): Form<Entity> {
    validateConfiguration(configuration);

    function reducer<Field = any>(state: Entity, action: DispatchAction<Field>): Entity {
        return setByPath(state, action.property, action.value);
    }

    const [state, dispatch] = useReducer(reducer, configuration.default);

    function getValue<Field>(property: PropertyPath): Field {
        return getByPath(state, property);
    }

    function updateValue<Field>(property: PropertyPath, value: Field): void {
        dispatch({ property, value });
    }

    return {
        entity: state,
        getValue,
        updateValue
    };
}

export type { Form };
export { useForm };
export default useForm;