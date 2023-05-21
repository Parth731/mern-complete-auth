// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
// data read you can use builder.query
// data write you can use builder.mutation
export const UserAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        console.log(user);
        return {
          url: 'register',
          method: 'post',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login',
          method: 'post',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email',
          method: 'post',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}`,
          method: 'post',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: `loggeduser`,
          method: 'get',
          // body: actualData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getChangePassword: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: `changepassword`,
          method: 'post',
          body: actualData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useGetLoggedUserQuery,
  useGetChangePasswordMutation,
} = UserAuthApi;
