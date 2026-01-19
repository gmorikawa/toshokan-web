import type { ID } from "@shared/entity/types/id";
import type { EntityController } from "@shared/entity/hooks/entity";
import { useEntity } from "@shared/entity/hooks/entity";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

export interface WhitepaperController extends EntityController<Whitepaper> { }

export function useWhitepaper(id: ID): WhitepaperController {
    const service = useWhitepaperService();

    return useEntity<Whitepaper>(
        () => service.getById(id),
        [id]
    );
}

export default useWhitepaper;
