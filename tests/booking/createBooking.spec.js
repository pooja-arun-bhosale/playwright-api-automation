import { test, expect } from "@playwright/test";
import bookingData from "../../test-data/bookingData.json";
import { BookingClient } from "../../src/clients/bookingClient.js";

test("Create a new booking", async ({ request }) => {
  const bookingClient = new BookingClient(request);
  const response = await bookingClient.createBooking(bookingData);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  const bookingId = responseBody.bookingid;
  expect(responseBody.bookingid).toBeDefined();
  console.log("Created Booking ID:", bookingId);
  // Get the created booking via API chaining
  const getResponse = await bookingClient.getBookingById(bookingId);
  const getResponseBody = await getResponse.json();
  expect(getResponseBody.firstname).toBe(bookingData.firstname);

  expect(getResponseBody.lastname).toBe(bookingData.lastname);

  expect(getResponseBody.totalprice).toBe(bookingData.totalprice);

  expect(getResponseBody.depositpaid).toBe(bookingData.depositpaid);

  expect(getResponseBody.bookingdates.checkin).toBe(
    bookingData.bookingdates.checkin,
  );

  expect(getResponseBody.bookingdates.checkout).toBe(
    bookingData.bookingdates.checkout,
  );

  expect(getResponseBody.additionalneeds).toBe(bookingData.additionalneeds);
});
