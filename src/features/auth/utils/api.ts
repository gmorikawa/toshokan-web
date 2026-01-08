import { Environment } from "@config/environment";

import type { Session } from "@features/auth/types/session";

export async function login(username: string, password: string): Promise<Session> {
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

    const session = await response.json();

    const token = session["token"];
    const loggedUser = session["loggedUser"];

    if (!token || token === "") {
        throw new Error("Login Request error: No token received from server");
    }

    if (!loggedUser || Object.keys(loggedUser).length === 0) {
        throw new Error("Login Request error: Invalid user data received from server");
    }

    return {
        token: session["token"],
        loggedUser: session["loggedUser"],
    };
}
