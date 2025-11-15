import type { Document, NewDocument } from "./document";
import type { Organization } from "./organization";

export interface Whitepaper extends Document {
    organization: Organization | null;
}

export interface NewWhitepaper extends NewDocument {
    organization: Organization | null;
}
