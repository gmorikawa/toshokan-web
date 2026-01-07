import { useEffect, useState } from "react";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";

import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import useAlert from "@components/feedback/use-alert";

export interface UseWhitepaperResult {
    whitepaper: Whitepaper | null;
}

export function useWhitepaper(id: string) {
    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });
    const alert = useAlert();

    const [whitepaper, setWhitepaper] = useState<Whitepaper | null>(null);

    useEffect(() => {
        service.getById(id)
            .then((response: Whitepaper) => {
                setWhitepaper(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [id]);

    return {
        whitepaper
    };
}

export default useWhitepaper;
