import { Environment } from "@/config/environment";

import type { Session } from "@features/auth/types/session";
import type { Topic } from "@features/topic/types/topic";
import type { TopicQueryOptions } from "@features/topic/types/query";

export async function getAllTopics(session: Session, query?: TopicQueryOptions): Promise<Topic[]> {
    const url = new URL(`${Environment.API_URL}/topics`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());
    query?.name && url.searchParams.append("query", query.name);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllTopics(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/topics/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getTopicById(session: Session, id: string): Promise<Topic> {
    const url = new URL(`${Environment.API_URL}/topics/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createTopic(session: Session, topic: Partial<Topic>): Promise<Topic> {
    const url = new URL(`${Environment.API_URL}/topics`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(topic)
    });

    return response.json();
}

export async function updateTopic(session: Session, id: string, topic: Topic): Promise<Topic> {
    const url = new URL(`${Environment.API_URL}/topics/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(topic)
    });

    return response.json();
}

export async function deleteTopic(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/topics/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
