import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGetAll {
  page: string;
  limit: string;
};

interface IGetOne {id: string};

const commonConfig = {
  method: 'POST',
  headers: {
    'Security-password': process.env.REACT_APP_SECURITY_PASSWORD
  },
};

export const conferencesApi = createApi({
  reducerPath: 'conferencesApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_BASE_URL}),
  endpoints: builder => ({
    getAllConferences: builder.mutation({
      query: (data: IGetAll) => ({
        url: 'conferences/getAll',
        ...commonConfig,
        body: data
      })
    }),
    getOneConference: builder.mutation({
      query: (data: IGetOne) => ({
        url: 'conferences/getOne',
        ...commonConfig,
        body: data
      })
    }),
    createOneConference: builder.mutation({
      query: (data) => ({
        url: 'conferences/create',
        ...commonConfig,
        body: data
      })
    })
  })
});

export const { 
  useGetAllConferencesMutation,
  useGetOneConferenceMutation,
  useCreateOneConferenceMutation
} = conferencesApi;