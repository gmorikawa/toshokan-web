export class URLBuilder {
    private baseUrl: string;
    private currentPath: string;
    private queryString: string[];

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        this.currentPath = "";
        this.queryString = [];
    }

    public appendPath(path: string): URLBuilder {
        if (!path.startsWith("/")) {
            path = `/${path}`;
        }

        if (path.endsWith("/")) {
            path = path.slice(0, -1);
        }

        this.currentPath += path;

        return this;
    }

    public appendQuery(key: string, value: string): URLBuilder {
        if (value) {
            this.queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }

        return this;
    }

    public toString(): string {
        let url = this.baseUrl + this.currentPath;
        if (this.queryString.length > 0) {
            url += "?" + this.queryString.join("&");
        }
        return url;
    }
}
