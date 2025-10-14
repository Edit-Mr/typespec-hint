import { api } from "./lib/api";

function App() {
    // ✅ Full IntelliSense for the body shape
    const res = await api.post("/users", {
        name: "Alice",
        email: "alice@example.com",
    });
    //    ^? typed as the success response for POST /users

    // ❌ If you send wrong/missing fields, TS errors immediately:
    await api.post("/users", {
        name: "OnlyName", // TS error: 'email' is missing
        extraneous: "not-allowed", // TS error: object literal may only specify known properties
    });

    // ❌ If you try to POST to a path that has no POST in your OpenAPI:
    await api.post("/users/{id}", {
        /* ... */
    }); // TS error if POST not defined for that path

    console.log(res);

    return (
        <>
            <h1>Demo</h1>
        </>
    );
}

export default App;
