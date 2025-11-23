import type { HttpClient } from "@/common/http-client";
import type { AuthenticationToken } from "@/entities/authentication-token";
import type { User } from "@/entities/models/user";

export class AuthService {
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    async login(username: string, password: string): Promise<AuthenticationToken> {
        const body = { username, password };
        return this.http.post<AuthenticationToken>("/api/auth/login", { body });
    }

    async getLoggedUser(token: string): Promise<User> {
        return this.http.get<User>("/api/auth/logged-user", { headers: { "Authorization": `Bearer ${token}` } });
    }
}

export default AuthService;