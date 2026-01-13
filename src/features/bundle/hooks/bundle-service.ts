import type { QueryOptions } from "@/types/query";
import { useSession } from "@features/auth/hooks/session";
import type { Bundle, NewBundle } from "@features/bundle/types/bundle";
import { countAllBundles,
    createBundle,
    deleteBundle,
    getAllBundles,
    getBundleById,
    updateBundle
} from "@features/bundle/utils/api";

export interface BundleService {
    getAll(query?: QueryOptions): Promise<Bundle[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Bundle>;
    create(bundle: NewBundle): Promise<Bundle>;
    update(bundle: Bundle): Promise<Bundle>;
    delete(bundle: Bundle): Promise<boolean>;
}

export function useBundleService(): BundleService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: QueryOptions) => getAllBundles(session, query),
        getById: async (id: string) => getBundleById(session, id),
        countAll: async () => countAllBundles(session),
        create: async (bundle: NewBundle) => createBundle(session, bundle),
        update: async (bundle: Bundle) => updateBundle(session, bundle.id, bundle),
        delete: async (bundle: Bundle) => deleteBundle(session, bundle.id)
    }
}
