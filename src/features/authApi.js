import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from '../constants/constant';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({

    createUser: builder.mutation({
      query: (query) => ({
        url: 'signup',
        method: "POST",
        body: query
      })
    }),

    userLogin: builder.mutation({
      query: (query) => ({
        url: 'login',
        method: "POST",
        body: query
      })
    }),

    updateUser: builder.mutation({
      query: (query) => ({
        url: '/update',
        method: "PATCH",
        body: { shippingAddress: query.shippingAddress },
        headers: {
          'Authorization': query.token
        }
      })
    })

  }),
});

export const { useCreateUserMutation, useUserLoginMutation, useUpdateUserMutation } = authApi