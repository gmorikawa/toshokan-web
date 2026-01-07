import type { Document, NewDocument } from "@features/document/types/document";
import type { Organization } from "@features/organization/types/organization";

export interface Whitepaper extends Document {
    organization: Organization | null;
}

export interface NewWhitepaper extends NewDocument {
    organization: Organization | null;
}
