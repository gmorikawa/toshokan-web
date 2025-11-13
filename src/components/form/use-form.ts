import { useReducer } from "react";

type PropertyPath = string;

interface Form<Entity = any> {
    entity: Entity;

    getValue<Field>(property: PropertyPath): Field;
    updateValue<Field>(property: PropertyPath, value: Field): void;
    reset(entity: Entity): void;
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

type ActionType = "updateValue" | "reset";

interface DispatchAction {
    type: ActionType;
}

interface UpdateValueDispatchAction<Field> extends DispatchAction {
    type: "updateValue";
    property: PropertyPath;
    value: Field;
}

interface ResetDispatchAction<Entity> {
    type: "reset";
    entity: Entity;
}

function useForm<Entity extends object = any>(configuration: UseFormConfiguration<Entity>): Form<Entity> {
    validateConfiguration(configuration);

    function reducer<Field = any>(state: Entity, action: UpdateValueDispatchAction<Field> | ResetDispatchAction<Entity>): Entity {
        switch (action.type) {
            case "updateValue": return setByPath(state, action.property, action.value);
            case "reset": return action.entity;
        }
    }

    const [state, dispatch] = useReducer(reducer, configuration.default);

    function getValue<Field>(property: PropertyPath): Field {
        return getByPath(state, property);
    }

    function updateValue<Field>(property: PropertyPath, value: Field): void {
        dispatch({ type: "updateValue", property, value });
    }

    function reset(entity: Entity): void {
        dispatch({ type: "reset", entity });
    }

    return {
        entity: state,
        getValue,
        updateValue,
        reset
    };
}

export type { Form };
export { useForm };
export default useForm;