import type { ID } from "@shared/entity/types/id";
import type { QueryOptions } from "@shared/search/types/query";

import { useSession } from "@features/auth/hooks/session";
import type { Category, NewCategory } from "@features/category/types/category";
import {
    countAllCategories,
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "@features/category/utils/api";

export interface CategoryService {
    getAll(query?: QueryOptions): Promise<Category[]>;
    countAll(): Promise<number>;
    getById(id: ID): Promise<Category>;
    create(category: NewCategory): Promise<Category>;
    update(category: Category): Promise<Category>;
    delete(category: Category): Promise<boolean>;
}

export function useCategoryService(): CategoryService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: QueryOptions) => getAllCategories(session, query),
        getById: async (id: ID) => getCategoryById(session, id),
        countAll: async () => countAllCategories(session),
        create: async (category: NewCategory) => createCategory(session, category),
        update: async (category: Category) => updateCategory(session, category.id, category),
        delete: async (category: Category) => deleteCategory(session, category.id)
    }
}
