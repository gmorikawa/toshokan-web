import type { NewOrganization, Organization } from "@features/organization/types/organization";
import type { QueryOptions } from "@/types/query";
import MainService, { type Service } from "@/services";

export class OrganizationService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<Organization[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Organization[]>(`/api/organizations?${queryString}`);
        }

        return this.http.get<Organization[]>("/api/organizations");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/organizations/count");
    }

    async getById(id: string): Promise<Organization> {
        return this.http.get<Organization>(`/api/organizations/${id}`);
    }

    async create(organization: NewOrganization): Promise<Organization> {
        const body = organization;
        return this.http.post<Organization>("/api/organizations", { body });
    }

    async update(organization: Organization): Promise<Organization> {
        const body = organization;
        return this.http.patch<Organization>(`/api/organizations/${organization.id}`, { body });
    }

    async remove(organization: Organization): Promise<void> {
        return this.http.delete<void>(`/api/organizations/${organization.id}`);
    }
}

export default OrganizationService;
