import { useEffect, useState } from "react";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import type { ResearchPaper } from "@/types/models/research-paper";
import useAlert from "@/components/feedback/use-alert";

export interface UseResearchPaperResult {
    researchPaper: ResearchPaper | null;
}

export function useResearchPaper(id: string) {
    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });
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
