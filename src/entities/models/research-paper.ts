import type { Document, NewDocument } from "./document";
import type { Organization } from "./organization";

export interface ResearchPaper extends Document {
    organization: Organization | null;
    keywords: string;
}

export interface NewResearchPaper extends NewDocument {
    organization: Organization | null;
    keywords: string;
}
