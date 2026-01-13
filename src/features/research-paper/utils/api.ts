import { Environment } from "@/config/environment";

import type { Session } from "@features/auth/types/session";
import type { NewResearchPaper, ResearchPaper } from "@features/research-paper/types/research-paper";
import type { ResearchPaperQueryOptions } from "@features/research-paper/types/query";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";

export async function getAllResearchPapers(session: Session, query?: ResearchPaperQueryOptions): Promise<ResearchPaper[]> {
    const url = new URL(`${Environment.API_URL}/research-papers`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());
    query?.title && url.searchParams.append("query", query.title);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllResearchPapers(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/research-papers/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getResearchPaperById(session: Session, id: string): Promise<ResearchPaper> {
    const url = new URL(`${Environment.API_URL}/research-papers/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createResearchPaper(session: Session, researchPaper: NewResearchPaper): Promise<ResearchPaper> {
    const url = new URL(`${Environment.API_URL}/research-papers`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(researchPaper)
    });

    return response.json();
}

export async function updateResearchPaper(session: Session, id: string, researchPaper: ResearchPaper): Promise<ResearchPaper> {
    const url = new URL(`${Environment.API_URL}/research-papers/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(researchPaper)
    });

    return response.json();
}

export async function deleteResearchPaper(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/research-papers/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}

export async function getResearchPaperFiles(session: Session, researchPaperId: string): Promise<DocumentFile[]> {
    const url = new URL(`${Environment.API_URL}/research-papers/${researchPaperId}/files`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function downloadResearchPaperFile(session: Session, researchPaperId: string, fileId: string): Promise<Blob> {
    const url = new URL(`${Environment.API_URL}/research-papers/${researchPaperId}/files/${fileId}/download`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.blob();
}

export async function uploadResearchPaperFile(session: Session, researchPaperId: string, documentFile: NewDocumentFile): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/research-papers/${researchPaperId}/files/upload`);
    const formData = new FormData();
    Object.entries(documentFile).forEach(([key, value]) => {
        formData.append(key, value);
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

export async function deleteResearchPaperFile(session: Session, researchPaperId: string, fileId: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/research-papers/${researchPaperId}/files/${fileId}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
