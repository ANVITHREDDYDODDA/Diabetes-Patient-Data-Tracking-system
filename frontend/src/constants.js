export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const USERS_URL = "/api/users";
export const DOCTOR_URL = "/api/doctor";
export const APPOINTMENT_URL = "/api/appointment";
export const LAB_URL = "/api/lab";
export const TEST_URL = "/api/test";
export const PAYPAL_URL = "/api/config/pay";
