import type { paths } from "../generated/openapi-types";

// All literal paths in your OpenAPI (like "/users", "/users/{id}", ...)
export type Path = keyof paths & string;

// What methods exist for a given path (e.g., "get" | "post")
export type MethodOf<P extends Path> = (keyof paths[P] & "get") | "post" | "put" | "patch" | "delete";

// ONLY paths that actually support method M (e.g. all POST-able paths)
export type PathsWithMethod<M extends string> = {
    [K in Path]: M extends keyof paths[K] ? K : never;
}[Path];

// JSON request body type for (path, method)
export type JsonBody<P extends Path, M extends MethodOf<P>> = paths[P][M] extends { requestBody: { content: { "application/json": infer T } } } ? T : never;

// Success response type (prefer 200/201 if present, otherwise any numeric code)
export type ResponseBody<P extends Path, M extends MethodOf<P>> = paths[P][M] extends { responses: infer R }
    ? 200 extends keyof R
        ? R[200]
        : 201 extends keyof R
        ? R[201]
        : R[keyof R & number]
    : unknown;

// Optional: query params type if you want it later
export type QueryParams<P extends Path, M extends MethodOf<P>> = paths[P][M] extends { parameters: { query: infer Q } } ? Q : Record<string, never>;
