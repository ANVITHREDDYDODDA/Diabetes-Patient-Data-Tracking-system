import { apiSlice } from "./apiSlice";
import { DOCTOR_URL, TEST_URL, LAB_URL } from "../constants";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    staffLogin: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getStaff: builder.query({
      query: () => ({
        url: DOCTOR_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Doctor"],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.doctorId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),
    getStaffByID: builder.query({
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `${DOCTOR_URL}/${staffId}`,
        method: "DELETE",
      }),
      providesTags: ["Doctor"],
    }),
    staffprofile: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.doctorId}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getTests: builder.query({
      query: () => ({
        url: `${TEST_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getLabs: builder.query({
      query: () => ({
        url: `${LAB_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTestByID: builder.query({
      query: (id) => ({
        url: `${TEST_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createTest: builder.mutation({
      query: (data) => ({
        url: `${TEST_URL}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Test"],
    }),
    updateTest: builder.mutation({
      query: (data) => ({
        url: `${TEST_URL}/${data.testId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Test"],
    }),
    deleteTest: builder.mutation({
      query: (testId) => ({
        url: `${TEST_URL}/${testId}`,
        method: "DELETE",
      }),
      providesTags: ["Test"],
    }),
  }),
});

export const {
  useStaffLoginMutation,
  useGetStaffQuery,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffByIDQuery,
  useUpdateStaffMutation,
  useStaffprofileMutation,
  useGetTestsQuery,
  useGetTestByIDQuery,
  useGetLabsQuery,
  useCreateTestMutation,
  useDeleteTestMutation,
  useUpdateTestMutation,
} = staffApiSlice;
