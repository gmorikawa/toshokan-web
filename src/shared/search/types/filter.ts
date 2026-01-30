export type FilterOperator =
    "EQUALS"
    | "NOT_EQUALS"
    | "CONTAINS"
    | "NOT_CONTAINS"
    | "STARTS_WITH"
    | "ENDS_WITH"
    | "GREATER_THAN"
    | "LESS_THAN"
    | "GREATER_THAN_OR_EQUAL"
    | "LESS_THAN_OR_EQUAL"
    | "IN"
    | "NOT_IN";

export interface FilterCondition<Value> {
    operator: FilterOperator;
    value: Value;
}

export type Filters<Field extends Object> =
    Partial<{
        [Key in keyof Field]:
            Field[Key] extends Object
                ? Filters<Field[Key]> | FilterCondition<Field[Key]> | Field[Key]
                : FilterCondition<Field[Key]>;
    }>;
