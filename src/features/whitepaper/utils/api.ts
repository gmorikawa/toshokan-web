import { Environment } from "@/config/environment";

import type { ID } from "@shared/entity/types/id";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { NewWhitepaper, Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import type { WhitepaperQueryOptions } from "@features/whitepaper/types/query";

export async function getAllWhitepapers(session: Session, query?: WhitepaperQueryOptions): Promise<Whitepaper[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("whitepapers");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL(url, query?.filters);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllWhitepapers(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/whitepapers/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getWhitepaperById(session: Session, id: string): Promise<Whitepaper> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createWhitepaper(session: Session, whitepaper: NewWhitepaper): Promise<Whitepaper> {
    const url = new URL(`${Environment.API_URL}/whitepapers`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(whitepaper)
    });

    return response.json();
}

export async function updateWhitepaper(session: Session, id: string, whitepaper: Whitepaper): Promise<Whitepaper> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(whitepaper)
    });

    return response.json();
}

export async function deleteWhitepaper(session: Session, id: ID): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}

export async function getWhitepaperFiles(session: Session, whitepaperId: ID): Promise<DocumentFile[]> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${whitepaperId}/files`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getWhitepaperFile(session: Session, whitepaperId: ID, documentFileId: ID): Promise<DocumentFile> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${whitepaperId}/files/${documentFileId}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function downloadWhitepaperFile(session: Session, whitepaperId: ID, fileId: ID): Promise<Blob> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${whitepaperId}/files/${fileId}/download`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.blob();
}

export async function uploadWhitepaperFile(session: Session, whitepaperId: ID, documentFile: NewDocumentFile): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${whitepaperId}/files/upload`);
    const formData = new FormData();
    Object.entries(documentFile).forEach(([key, value]) => {
        formData.append(key, value as any);
    });

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${session.token}`
        },
        body: formData
    });

    return response.ok;
}

export async function deleteWhitepaperFile(session: Session, whitepaperId: ID, fileId: ID): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/whitepapers/${whitepaperId}/files/${fileId}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
