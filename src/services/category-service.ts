import type { NewCategory, Category } from "@/entities/models/category";
import MainService, { type Service } from "@/services";

export class CategoryService extends MainService implements Service {
    async getAll(): Promise<Category[]> {
        return this.http.get<Category[]>("/api/categories");
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
