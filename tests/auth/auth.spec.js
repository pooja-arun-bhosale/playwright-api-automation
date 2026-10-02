import { test, expect } from "@playwright/test";
import { AuthClient } from "../../src/clients/authClient";
import { config } from "../../src/utils/config";

test("Generate authentication token", async ({ request }) => {
  const authClient = new AuthClient(request);
  const response = await authClient.createToken(
    config.username,
    config.password,
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log("Auth Response:", responseBody);
  expect(responseBody.token).toBeDefined();
});
