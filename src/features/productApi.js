import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { baseURL } from '../constants/constant';
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({

    getAllProduct: builder.query({
      query: (query) => ({
        url: '/',
        method: "GET",
      }),
      providesTags: ['Product'],

    }),

    createProduct: builder.mutation({
      query: (query) => ({
        url: '/api/add-product',
        method: 'POST',
        headers: {
          'Authorization': query.token
        },
        body: query.details
      }),
      invalidatesTags: ['Product'],

    }),


    updateProduct: builder.mutation({
      query: (query) => ({
        url: `/api/update-product/${query.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': query.token
        },
        body: query.details
      }),
      invalidatesTags: ['Product'],

    }),

    deleteProduct: builder.mutation({
      query: (query) => ({
        url: `/api/delete-product`,
        method: 'POST',
        headers: {
          'Authorization': query.token
        },
        body: query.prodDetail
      }),
      invalidatesTags: ['Product'],
    }),

    getProductByID: builder.query({
      query: (query) => ({
        url: `/api/product/${query}`,
        method: "GET",
      }),
      providesTags: ['Product'],

    }),

    updateProductReview: builder.mutation({
      query: (query) => ({
        url: `/api/add-review/${query.productID}`,
        body: query.body,
        method: "PATCH",
        headers: {
          "Authorization": query.token,
        },
      }),
      invalidatesTags: ['Product'],
    })


  }),

})

export const { useCreateProductMutation, useGetAllProductQuery, useUpdateProductMutation, useDeleteProductMutation, useGetProductByIDQuery, useUpdateProductReviewMutation } = productApi

