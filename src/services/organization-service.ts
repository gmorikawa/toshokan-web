import type { NewOrganization, Organization } from "@/entities/models/organization";
import MainService, { type Service } from "@/services";

export class OrganizationService extends MainService implements Service {
    async getAll(): Promise<Organization[]> {
        return this.http.get<Organization[]>("/api/organizations");
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
