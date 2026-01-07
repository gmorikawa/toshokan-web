import type { NewBundle, Bundle } from "@features/bundle/types/bundle";
import type { QueryOptions } from "@/types/query";
import MainService, { type Service } from "@/services";

export class BundleService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<Bundle[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Bundle[]>(`/api/bundles?${queryString}`);
        }

        return this.http.get<Bundle[]>("/api/bundles");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/bundles/count");
    }

    async getById(id: string): Promise<Bundle> {
        return this.http.get<Bundle>(`/api/bundles/${id}`);
    }

    async create(bundle: NewBundle): Promise<Bundle> {
        const body = bundle;
        return this.http.post<Bundle>("/api/bundles", { body });
    }

    async update(bundle: Bundle): Promise<Bundle> {
        const body = bundle;
        return this.http.patch<Bundle>(`/api/bundles/${bundle.id}`, { body });
    }

    async remove(bundle: Bundle): Promise<void> {
        return this.http.delete<void>(`/api/bundles/${bundle.id}`);
    }
}

export default BundleService;
