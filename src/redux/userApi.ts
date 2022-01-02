import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUserData {
  conferences: Array<any>
  createdAt?: string
  email?: string
  job?: string
  likedConferences: Array<any>
  name?: string
  updatedAt?: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_BASE_URL}),
  endpoints: builder => ({
    getProfileData: builder.query({
      query: (token: string) => ({
        url: 'auth/profile',
        method: 'GET',
        headers: {
          'Security-password': process.env.REACT_APP_SECURITY_PASSWORD,
          'Authorization': `Bearer ${token}`
        }
      })
    })
  })
})

export const {useGetProfileDataQuery} = userApi;