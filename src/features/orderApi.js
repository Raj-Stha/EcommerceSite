import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL } from "../constants/constant";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (query) => ({
        url: '/api/create-order',
        method: "POST",
        headers: {
          "Authorization": query.token,
        },
        body: {
          orderItems: query.orderItems,
          totalAmount: query.totalPrice
        }


      })
    })
  }),
})

export const { useCreateOrderMutation } = orderApi;