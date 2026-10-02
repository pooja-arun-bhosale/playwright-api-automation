import { expect, test } from "@playwright/test";
import { BookingClient } from "../../src/clients/bookingClient";
import { validateSchema } from "../../src/utils/schemaValidator";
import bookingSchema from "../../schemas/bookingSchema.json";

test("GET all bookings", async ({ request }) => {
  const bookingClient = new BookingClient(request);
  const response = await bookingClient.getAllBookings();
  expect(response.status()).toBe(200);
  const bookings = await response.json();
  console.log(bookings);
});

test("GET booking by ID", async ({ request }) => {
  const bookingClient = new BookingClient(request);
  const response = await bookingClient.getBookingById(1);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  const isValid = validateSchema(responseBody, bookingSchema);
  expect(isValid).toBe(true);
});
