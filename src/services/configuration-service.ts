import type { HttpClient } from "@/common/http-client";
import type { NewUser } from "@/entities/models/user";

export class ConfigurationService {
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    async configureAdminUser(user: NewUser): Promise<void> {
        const body = user;
        return this.http.post<void>("/api/configuration/admin", { body });
    }
}

export default ConfigurationService;