import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUserData {
  conferences: Array<any>
  createdAt?: string
  email?: string
  job?: string
  likedConferences: Array<any>
  name?: string
  updatedAt?: string
  _id?: string
}

interface ILikeData {
  userId: string;
  conferenceId: string;
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
    }),
    like: builder.mutation({
      query: (data: ILikeData) => ({
        url: `users/addToFavourite`,
        method: 'PATCH',
        headers: {
          'Security-password': process.env.REACT_APP_SECURITY_PASSWORD
        },
        body: data
      })
    })
  })
})

export const {useGetProfileDataQuery, useLikeMutation} = userApi;