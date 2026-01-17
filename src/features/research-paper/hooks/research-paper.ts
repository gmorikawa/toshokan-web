import { useEffect, useState } from "react";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

import { useAlert } from "@components/feedback/alert/controller";

export interface UseResearchPaperResult {
    researchPaper: ResearchPaper | null;
}

export function useResearchPaper(id: string) {
    const service = useResearchPaperService();
    const alert = useAlert();

    const [researchPaper, setResearchPaper] = useState<ResearchPaper | null>(null);

    useEffect(() => {
        service.getById(id)
            .then((response: ResearchPaper) => {
                setResearchPaper(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [id]);

    return {
        researchPaper
    };
}

export default useResearchPaper;
