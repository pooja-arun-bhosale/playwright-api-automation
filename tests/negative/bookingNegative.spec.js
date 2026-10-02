import { test, expect } from "../../src/fixtures/apiFixture.js";

test("Get booking with invalid booking ID", async ({
  bookingClient
}) => {
  const invalidBookingId = 999999;
  const response =
    await bookingClient.getBookingById(invalidBookingId);
  expect(response.status()).toBe(404);
});
