import { test, expect } from "../../src/fixtures/apiFixture.js";
import bookingData from "../../test-data/bookingData.json";
import updateBookingData from "../../test-data/updateBookingData.json";
import patchBookingData from "../../test-data/patchBookingData.json";

test("Complete booking lifecycle", async ({ bookingClient, token }) => {
  // 1. Create booking
  const createResponse = await bookingClient.createBooking(bookingData);
  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;
  expect(bookingId).toBeDefined();
  console.log("Created Booking ID:", bookingId);

  // 2. Get booking
  const getResponse = await bookingClient.getBookingById(bookingId);
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  expect(getBody.firstname).toBe(bookingData.firstname);
  expect(getBody.lastname).toBe(bookingData.lastname);

  // 3. Update booking using PUT
  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updateBookingData,
    token,
  );

  expect(updateResponse.status()).toBe(200);
  const updateBody = await updateResponse.json();
  expect(updateBody.firstname).toBe(updateBookingData.firstname);
  expect(updateBody.lastname).toBe(updateBookingData.lastname);
  expect(updateBody.totalprice).toBe(updateBookingData.totalprice);

  // 4. Patch booking
  const patchResponse = await bookingClient.patchBooking(
    bookingId,
    patchBookingData,
    token,
  );
  expect(patchResponse.status()).toBe(200);
  const patchBody = await patchResponse.json();
  expect(patchBody.additionalneeds).toBe(patchBookingData.additionalneeds);

  // 5. Get booking after modifications
  const finalGetResponse = await bookingClient.getBookingById(bookingId);
  expect(finalGetResponse.status()).toBe(200);
  const finalBody = await finalGetResponse.json();
  expect(finalBody.firstname).toBe(updateBookingData.firstname);
  expect(finalBody.lastname).toBe(updateBookingData.lastname);
  expect(finalBody.totalprice).toBe(updateBookingData.totalprice);
  expect(finalBody.additionalneeds).toBe(patchBookingData.additionalneeds);

  // 6. Delete booking
  const deleteResponse = await bookingClient.deleteBooking(bookingId, token);
  expect(deleteResponse.status()).toBe(201);

  // 7. Verify deletion
  const deletedGetResponse = await bookingClient.getBookingById(bookingId);
  expect(deletedGetResponse.status()).toBe(404);
});
