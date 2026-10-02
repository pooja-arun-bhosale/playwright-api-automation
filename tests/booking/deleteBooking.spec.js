import { test, expect } from "../../src/fixtures/apiFixture.js";
import bookingData from "../../test-data/bookingData.json";

test("Create and delete booking", async ({ bookingClient, token }) => {
  // Create booking
  const createResponse = await bookingClient.createBooking(bookingData);
  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;
  expect(bookingId).toBeDefined();
  // Delete booking
  const deleteResponse = await bookingClient.deleteBooking(bookingId, token);
  expect(deleteResponse.status()).toBe(201);
  // Verify deletion
  const getResponse = await bookingClient.getBookingById(bookingId);
  expect(getResponse.status()).toBe(404);
});
