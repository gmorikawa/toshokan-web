import type { QueryOptions } from "@/types/query";
import { useSession } from "@features/auth/hooks/session";
import type { Organization, NewOrganization } from "@features/organization/types/organization";
import { countAllOrganizations,
    createOrganization,
    deleteOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization
} from "@features/organization/utils/api";

export interface OrganizationService {
    getAll(query?: QueryOptions): Promise<Organization[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Organization>;
    create(organization: NewOrganization): Promise<Organization>;
    update(organization: Organization): Promise<Organization>;
    delete(organization: Organization): Promise<boolean>;
}

export function useOrganizationService(): OrganizationService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: QueryOptions) => getAllOrganizations(session, query),
        getById: async (id: string) => getOrganizationById(session, id),
        countAll: async () => countAllOrganizations(session),
        create: async (organization: NewOrganization) => createOrganization(session, organization),
        update: async (organization: Organization) => updateOrganization(session, organization.id, organization),
        delete: async (organization: Organization) => deleteOrganization(session, organization.id)
    }
}
