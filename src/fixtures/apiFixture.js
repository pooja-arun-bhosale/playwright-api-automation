import { test as base, expect } from "@playwright/test";
import { AuthClient } from "../clients/authClient.js";
import { BookingClient } from "../clients/bookingClient.js";
import { config } from "../utils/config.js";

export const test = base.extend({

  authClient: async ({ request }, use) => {
    const authClient = new AuthClient(request);
    await use(authClient);
  },

  bookingClient: async ({ request }, use) => {
    const bookingClient = new BookingClient(request);
    await use(bookingClient);
  },

  token: async ({ request }, use) => {
    const authClient = new AuthClient(request);
    const response = await authClient.createToken(
      config.username,
      config.password
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeDefined();
    await use(responseBody.token);
  }
});

export { expect };