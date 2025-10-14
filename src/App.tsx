import { api } from "./lib/api";

async function App() {
  // ✅ Full IntelliSense for the body shape
  const res = await api.post("/api/orgs", {
    name: "NYCU SDC2",
    description: "陽明交大軟體開發社",
    slug: "nycu-sdc1",
    metadata: {},
  });
  //    ^? typed as the success response for POST /users

  // ❌ If you send wrong/missing fields, TS errors immediately:
  await api.post("/api/orgs", {
    name: "NYCU SDC2",
    description: "陽明交大軟體開發社",
    slug: "nycu-sdc1",
    metadata: {
      type: "club",
    },
  });

  // ❌ If you try to POST to a path that has no POST in your OpenAPI:
  await api.post("/users", {
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
