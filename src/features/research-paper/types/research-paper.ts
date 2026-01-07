import type { Document, NewDocument } from "@features/document/types/document";
import type { Organization } from "@features/organization/types/organization";

export interface ResearchPaper extends Document {
    organization: Organization | null;
    keywords: string;
}

export interface NewResearchPaper extends NewDocument {
    organization: Organization | null;
    keywords: string;
}
