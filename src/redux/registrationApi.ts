import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_BASE_URL}),
  endpoints: builder => ({
    registration: builder.mutation({
      query: data => {
        const {url, ...other} = data;
        return {
          url: `auth/${data.url}`,
          method: 'POST',
          headers: {
            'Security-password': process.env.REACT_APP_SECURITY_PASSWORD
          },
          body: other
        }
      }
    })
  })
});

export const { useRegistrationMutation } = registrationApi;