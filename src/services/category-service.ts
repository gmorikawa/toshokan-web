import type { NewCategory, Category } from "@features/category/types/category";
import type { QueryOptions } from "@/types/query";
import MainService, { type Service } from "@/services";

export class CategoryService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<Category[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Category[]>(`/api/categories?${queryString}`);
        }

        return this.http.get<Category[]>("/api/categories");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/categories/count");
    }

    async getById(id: string): Promise<Category> {
        return this.http.get<Category>(`/api/categories/${id}`);
    }

    async create(category: NewCategory): Promise<Category> {
        const body = category;
        return this.http.post<Category>("/api/categories", { body });
    }

    async update(category: Category): Promise<Category> {
        const body = category;
        return this.http.patch<Category>(`/api/categories/${category.id}`, { body });
    }

    async remove(category: Category): Promise<void> {
        return this.http.delete<void>(`/api/categories/${category.id}`);
    }
}

export default CategoryService;
