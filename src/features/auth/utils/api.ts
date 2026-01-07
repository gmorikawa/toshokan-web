import { Environment } from "@config/environment";

export async function loginRequest(username: string, password: string) {
    const response = await fetch(Environment.API_URL.concat("/auth/login"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Wrong username and/or password");
    }

    return response.json();
}
