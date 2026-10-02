export class BookingClient {
  constructor(request) {
    this.request = request;
  }

  async getAllBookings() {
    return await this.request.get("/booking");
  }

  async getBookingById(bookingId) {
    return await this.request.get(`/booking/${bookingId}`);
  }

  async createBooking(bookingData) {
    return await this.request.post("/booking", {
      data: bookingData,
    });
  }

  async updateBooking(bookingId, bookingData, token) {
    return await this.request.put(`/booking/${bookingId}`, {
      data: bookingData,
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async patchBooking(bookingId, bookingData, token) {
    return await this.request.patch(`/booking/${bookingId}`, {
      data: bookingData,
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async deleteBooking(bookingId, token) {
    return await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
