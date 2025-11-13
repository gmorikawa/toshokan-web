import type { HttpClient } from "@/common/http-client";

export interface Service { }

export class MainService implements Service {
    protected readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }
}

export default MainService;