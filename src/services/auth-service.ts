import type { HttpClient } from "@/common/http-client";
import type { AuthenticationToken } from "@/entities/authentication-token";

class AuthService {
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    async login(username: string, password: string): Promise<AuthenticationToken> {
        const body = { username, password };
        return this.http.post<AuthenticationToken>("/api/auth/login", { body });
    }
}

export { AuthService };
export default AuthService;