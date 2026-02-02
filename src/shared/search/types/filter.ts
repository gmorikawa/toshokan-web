import type { Nullable } from "@shared/object/types/nullable";

export type FilterOperator =
    "contains"
    | "eq"
    | "neq"
    | "gt"
    | "lt"
    | "gte"
    | "lte"
    | "in"
    | "nin";

export interface FilterCriteria<Value = any> {
    operator: FilterOperator;
    value: Nullable<Value>;
}

export type Filters<Field extends Object> = Partial<{
    [Key in keyof Field]: FilterCriteria<Field[Key]>[];
}>;

// export type Filters<Field extends Object> =
//     Partial<{
//         [Key in keyof Field]:
//             Field[Key] extends Object
//                 ? Filters<Field[Key]> | FilterCondition<Field[Key]> | Field[Key]
//                 : FilterCondition<Field[Key]>;
//     }>;