import { useReducer, useState } from "react";
import type z from "zod";
import useValidator from "./use-validator";

type PropertyPath = string;

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

export interface UseFormConfiguration<Entity> {
    default: Entity;
    validator?: z.ZodObject;

    onSubmit?(entity: Entity): void;
}

export interface Form<Entity = any> {
    entity: Entity;

    getValue<Field>(property: PropertyPath): Field;
    getError(property: PropertyPath): string;
    updateValue<Field>(property: PropertyPath, value: Field): void;
    reset(entity: Entity): void;
    isValid(): boolean;

    onChange<Field>(property: PropertyPath, value: Field): void;
    onBlur<Field>(property: PropertyPath, value: Field): void;

    submit(): void;
}

export function useForm<Entity extends object = any>(configuration: UseFormConfiguration<Entity>): Form<Entity> {
    validateConfiguration(configuration);

    const validation = useValidator<Entity>(configuration.validator!);
    const [dirties, setDirties] = useState<Record<string, boolean>>(
        configuration.validator?.shape
            ? Object
                .keys(configuration.validator.shape)
                .reduce(
                    (acc, key) => {
                        acc[key] = false;
                        return acc;
                    }, {} as Record<string, boolean>)
            : {}
    );

    const [state, dispatch] = useReducer(
        function <Field = any>(state: Entity, action: UpdateValueDispatchAction<Field> | ResetDispatchAction<Entity>): Entity {
            switch (action.type) {
                case "updateValue":
                    const newValue = setByPath(state, action.property, action.value);
                    validation.validate(newValue as any);
                    return newValue;
                case "reset":
                    return action.entity;
            }
        },
        configuration.default);

    function getValue<Field>(property: PropertyPath): Field {
        return getByPath(state, property);
    }

    function getError(property: PropertyPath): string {
        if (!dirties[property]) {
            return "";
        }

        return validation.errors?.[property] ?? "";
    }

    function isValid(): boolean {
        return validation.validate(state);
    }

    function updateValue<Field>(property: PropertyPath, value: Field): void {
        dispatch({ type: "updateValue", property, value });
    }

    function reset(entity: Entity): void {
        dispatch({ type: "reset", entity });
    }

    function onChange<Field>(property: PropertyPath, value: Field): void {
        updateValue(property, value);
    }

    function onBlur<Field>(property: PropertyPath, value: Field): void {
        updateValue(property, value);
        setDirties((previous) => ({ ...previous, [property]: true }));
    }

    function submit(): void {
        setDirties((previous) => {
            Object.keys(previous).forEach((key) => {
                previous[key] = true;
            });

            return previous;
        });

        if (configuration.onSubmit && isValid()) {
            configuration.onSubmit(state);
        }
    }

    return {
        entity: state,
        getValue,
        getError,
        updateValue,
        reset,
        isValid,
        onChange,
        onBlur,
        submit
    };
}

export default useForm;