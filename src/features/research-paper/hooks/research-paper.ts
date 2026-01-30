import type { ID } from "@shared/entity/types/id";
import type { EntityController } from "@shared/entity/hooks/entity";
import { useEntity } from "@shared/entity/hooks/entity";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

export interface ResearchPaperController extends EntityController<ResearchPaper> { }

export function useResearchPaper(id: ID): ResearchPaperController {
    const service = useResearchPaperService();

    return useEntity<ResearchPaper>(
        () => service.getById(id),
        [id]
    );
}
