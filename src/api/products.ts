import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import { ListResponse } from '../types/api';
import { Product, ProductForm, ProductPrice } from '../types/products';
import { camelToUnderline, underlineToCamelDeep } from '../utils/caseConverter';
import {VendorFullInfo} from "../types/vendors";

export const productsApi = createApi({
  reducerPath: 'products',
  tagTypes: ['products'],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getProducts: builder.query<ListResponse<Product>, { id?: string, params: { page?: number, limit?: number } }>({
      query: ({ id, params }) => ({
        url: `seller-center/vendor-products/${id}`,
        params
      }),
      transformResponse: (resp: any) => ({
        pageCount: resp.page_count,
        total: resp.total,
        data: resp.data.map((item: typeof Object) => ({ ...underlineToCamelDeep(item) }))
      }),
      providesTags: ['products']
    }),
    createProduct: builder.mutation<any, ProductForm>({
      query: (body) => ({
        url: `seller-center/product/`,
        method: 'POST',
        body
      })
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `seller-center/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products']
    }),
    addProductToVendor: builder.mutation<any, {product: string, vendor: string}>({
      query: (body) => ({
        url: `seller-center/vendor-product/`,
        method: 'POST',
        body: camelToUnderline(body)
      }),
      invalidatesTags: ['products']
    }),
    addProductPrice: builder.mutation<any, ProductPrice>({
      query: (price) => ({
        url: `seller-center/product-price/`,
        method: 'POST',
        body: camelToUnderline(price)
      }),
      invalidatesTags: ['products']
    }),
    uploadProductMedia: builder.mutation<any,{id: string, body: FormData}>({
      query: ({ id, body }) => ({
        url: `seller-center/media/product/upload/${id}`,
        method: 'POST',
        body,
      }),
    }),
    getManufacturers: builder.query<ListResponse<any>, string>({
      query: (query) => ({
        url: `search/manufacturer/`,
        params: {query}
      }),
      transformResponse: (resp: any) => ({
        pageCount: resp.page_count,
        total: resp.total,
        data: resp.data.map((item: typeof Object) => ({ ...underlineToCamelDeep(item) }))
      }),
    }),
    getCategories: builder.query<ListResponse<any>, void>({
      query: () => ({
        url: `categories/roots`,
      }),
      transformResponse: (resp: any) => ({
        pageCount: 1,
        total: resp.length,
        data: resp.map((item: typeof Object) => ({ ...underlineToCamelDeep(item) }))
      }),
    }),
    getProduct: builder.query<any, any>({
      query: ({id}) => {
        return {
          url: `/seller-center/product/${id}`,
        }
      },
      transformResponse: (resp:any) => ({
        ...underlineToCamelDeep(resp)
      }),
    }),
  })
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetManufacturersQuery,
  useGetCategoriesQuery,
  useGetProductQuery,
} = productsApi;
