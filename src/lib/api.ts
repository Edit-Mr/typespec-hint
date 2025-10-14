// src/lib/api.ts
import { PathsWithMethod, JsonBody, ResponseBody } from "./api-types";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function handle<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) {
        // optional: throw richer errors
        throw new Error(`${res.status} ${res.statusText}`);
    }
    // if no content, return undefined as any
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
}

export const api = {
    get<P extends PathsWithMethod<"get">>(path: P, init?: RequestInit) {
        return handle<ResponseBody<P, "get">>(BASE + path, { ...init, method: "GET" });
    },

    post<P extends PathsWithMethod<"post">>(path: P, body: JsonBody<P, "post">, init?: Omit<RequestInit, "method" | "body" | "headers">) {
        return handle<ResponseBody<P, "post">>(BASE + path, {
            ...init,
            method: "POST",
            headers: { "Content-Type": "application/json", ...(init?.headers as HeadersInit) },
            body: JSON.stringify(body),
        });
    },

    put<P extends PathsWithMethod<"put">>(path: P, body: JsonBody<P, "put">, init?: Omit<RequestInit, "method" | "body" | "headers">) {
        return handle<ResponseBody<P, "put">>(BASE + path, {
            ...init,
            method: "PUT",
            headers: { "Content-Type": "application/json", ...(init?.headers as HeadersInit) },
            body: JSON.stringify(body),
        });
    },

    patch<P extends PathsWithMethod<"patch">>(path: P, body: JsonBody<P, "patch">, init?: Omit<RequestInit, "method" | "body" | "headers">) {
        return handle<ResponseBody<P, "patch">>(BASE + path, {
            ...init,
            method: "PATCH",
            headers: { "Content-Type": "application/json", ...(init?.headers as HeadersInit) },
            body: JSON.stringify(body),
        });
    },

    delete<P extends PathsWithMethod<"delete">>(path: P, init?: RequestInit) {
        return handle<ResponseBody<P, "delete">>(BASE + path, { ...init, method: "DELETE" });
    },
};
