import { apiSlice } from "./apiSlice";
import { APPOINTMENT_URL, PAYPAL_URL } from "../constants";

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: APPOINTMENT_URL,
        method: "POST",
        body: appointment,
      }),
    }),
    getAppointmentById: builder.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateStatus: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENT_URL}/${data.appointmentId}`,
        method: "PUT",
        body: data,
      }),

      providesTags: ["Appointment"],
    }),
    getClientID: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    payAppointment: builder.mutation({
      query: ({ appointmentId, details }) => ({
        url: `${APPOINTMENT_URL}/${appointmentId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    cancelAppointment: builder.mutation({
      query: ({ appointmentId }) => ({
        url: `${APPOINTMENT_URL}/${appointmentId}/cancel`,
        method: "PUT",
      }),
    }),

    getMyAppointments: builder.query({
      query: (userId) => ({
        url: `${APPOINTMENT_URL}/myappointments/${userId}`,
      }),

      keepUnusedDataFor: 5,
    }),

    getDoctorAppointments: builder.query({
      query: (doctorId) => ({
        url: `${APPOINTMENT_URL}/doctorappointments/${doctorId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAppointments: builder.query({
      query: () => ({
        url: APPOINTMENT_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Appointment"],
    }),

    getReadyAppointments: builder.query({
      query: () => ({
        url: `${APPOINTMENT_URL}/ready`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Appointment"],
    }),
    createTestReport: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENT_URL}/${data.appointmentId}/testreport`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),
    //     createFeed: builder.mutation({
    // query
    //     }),
    createPre: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENT_URL}/${data.appointmentId}/pre`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useCreateTestReportMutation,
  useGetClientIDQuery,
  useGetAppointmentByIdQuery,
  usePayAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetAppointmentsQuery,
  useUpdateStatusMutation,
  useCreatePreMutation,
  useCancelAppointmentMutation,
  useGetDoctorAppointmentsQuery,
  useGetReadyAppointmentsQuery,
} = appointmentApiSlice;
