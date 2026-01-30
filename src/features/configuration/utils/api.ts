import { Environment } from "@config/environment";
import type { NewUser } from "@features/user/types/user";

export async function configureAdminUser(user: NewUser): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/configuration/admin-user`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return response.ok;
}