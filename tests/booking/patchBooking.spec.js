import { test, expect } from "../../src/fixtures/apiFixture.js";
import bookingData from "../../test-data/bookingData.json";
import patchBookingData from "../../test-data/patchBookingData.json";

test("Create and patch booking", async ({ bookingClient, token }) => {
  // Create booking
  const createResponse = await bookingClient.createBooking(bookingData);
  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;
  expect(bookingId).toBeDefined();

  // Patch booking
  const patchResponse = await bookingClient.patchBooking(
    bookingId,
    patchBookingData,
    token,
  );
  expect(patchResponse.status()).toBe(200);
  const patchBody = await patchResponse.json();

  // Verify patch response
  expect(patchBody.additionalneeds).toBe(patchBookingData.additionalneeds);
  // Get booking after patch
  const getResponse = await bookingClient.getBookingById(bookingId);
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  // Verify persisted patch
  expect(getBody.additionalneeds).toBe(patchBookingData.additionalneeds);
});
