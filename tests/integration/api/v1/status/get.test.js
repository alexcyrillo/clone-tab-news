test("GET to api/v1/status should return 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status")
  const resBody = await res.json();
  const parsedUpdatedAt = new Date(resBody.updated_at).toISOString();

  expect(res.status).toBe(200);

  expect(resBody.updated_at).toBe(parsedUpdatedAt);

  expect(resBody.dependencies.database.version).toMatch(/^\d+\.\d+(\.\d+)?/)

  expect(resBody.dependencies.database.max_connections).toBeGreaterThanOrEqual(0)

  expect(resBody.dependencies.database.active_connections).toBeGreaterThanOrEqual(0)
  
  expect(resBody.dependencies.database.active_connections).toBe(1);

})