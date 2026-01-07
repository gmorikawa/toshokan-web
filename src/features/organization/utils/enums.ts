import type { OrganizationType } from "@features/organization/types/organization";

export interface OrganizationTypeMetadata {
    type: OrganizationType;
    label: string;
}

export class OrganizationTypeUtil {
    static getMetadata(): OrganizationTypeMetadata[] {
        return [
            { type: "UNIVERSITY", label: "University" },
            { type: "COMPANY", label: "Company" },
        ];
    }

    static getAll(): OrganizationType[] {
        return ["UNIVERSITY", "COMPANY"];
    }

    static getNameByType(type: OrganizationType): string {
        switch (type) {
            case "UNIVERSITY":
                return "University";
            case "COMPANY":
                return "Company";
            default:
                return "Unknown";
        }
    }
}

export default OrganizationTypeUtil;