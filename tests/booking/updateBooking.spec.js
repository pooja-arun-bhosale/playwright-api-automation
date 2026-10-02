import { test, expect } from "../../src/fixtures/apiFixture.js";
import bookingData from "../../test-data/bookingData.json";
import updateBookingData from "../../test-data/updateBookingData.json";

test("Create and update booking", async ({ bookingClient, token }) => {
  // Create booking
  const createResponse = await bookingClient.createBooking(bookingData);
  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;
  expect(bookingId).toBeDefined();

  // Update booking
  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updateBookingData,
    token,
  );
  expect(updateResponse.status()).toBe(200);
  const updateBody = await updateResponse.json();
  // Verify update response
  expect(updateBody.firstname).toBe(updateBookingData.firstname);
  expect(updateBody.lastname).toBe(updateBookingData.lastname);
  expect(updateBody.totalprice).toBe(updateBookingData.totalprice);
  expect(updateBody.depositpaid).toBe(updateBookingData.depositpaid);
  expect(updateBody.bookingdates.checkin).toBe(
    updateBookingData.bookingdates.checkin,
  );
  expect(updateBody.bookingdates.checkout).toBe(
    updateBookingData.bookingdates.checkout,
  );
  expect(updateBody.additionalneeds).toBe(updateBookingData.additionalneeds);

  // Get booking after update
  const getResponse = await bookingClient.getBookingById(bookingId);
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  // Verify persisted update
  expect(getBody.firstname).toBe(updateBookingData.firstname);
  expect(getBody.lastname).toBe(updateBookingData.lastname);
  expect(getBody.totalprice).toBe(updateBookingData.totalprice);
  expect(getBody.depositpaid).toBe(updateBookingData.depositpaid);
  expect(getBody.bookingdates.checkin).toBe(
    updateBookingData.bookingdates.checkin,
  );
  expect(getBody.bookingdates.checkout).toBe(
    updateBookingData.bookingdates.checkout,
  );
  expect(getBody.additionalneeds).toBe(updateBookingData.additionalneeds);
});
