import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import {ListResponse} from "../types/api";
import {camelToUnderline, underlineToCamelDeep} from "../utils/caseConverter";
import {DistributorsOffersGrouped, DistributorsOrders, DistributorsProductOffers} from "../types/distributors";
import {Vendor} from "../types/vendors";

export const distributorApi = createApi({
  reducerPath: 'distributors',
  tagTypes: ['distributors', 'orders'],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getDistributorOffersByVendorId: builder.query<ListResponse<any>, { id: string, page?: number, limit?: number }>({
      query: ({id, page, limit}) => {
        return {
          url: `/seller-center/distributor-offers/${id}`,
          params: {page, limit},
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
      //providesTags: ['distributors'],
    }),

    getDistributorOffersGroupedByVendorId: builder.query<ListResponse<DistributorsOffersGrouped>, { id: string, page?: number, limit?: number }>({
      query: ({id, page, limit}) => {
        return {
          url: `/seller-center/distributor-offers/${id}/grouped`,
          params: {page, limit},
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
      //providesTags: ['distributors'],
    }),

    getDistributorOffersByProductId: builder.query<ListResponse<DistributorsProductOffers>, { productId: string, vendorId: string, page?: number, limit?: number }>({
      query: ({productId, vendorId, page, limit}) => {
        return {
          url: `/seller-center/distributor-offers/by-product/${productId}/${vendorId}`,
          params: {page, limit},
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
      //providesTags: ['distributors'],
    }),

    getDistributorOfferByOfferId: builder.query<any, any>({
      query: ({offerId}) => {
        return {
          url: `/seller-center/distributor-offer/${offerId}`,
        }
      },
    }),

    getDistributorAsloSells: builder.query<ListResponse<DistributorsOffersGrouped>, { distributorId: string, currentVendorId: string}>({
      query: ({distributorId, currentVendorId}) => {
        return {
          url: `/seller-center/distributor-offer/also-sells/${currentVendorId}/${distributorId}`,
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
    }),

    getMyOrdersByVendorId: builder.query<ListResponse<DistributorsOrders>, { vendorId: string, page?: number, limit?: number }>({
      query: ({vendorId, page, limit}) => {
        return {
          url: `/seller-center/distributor-orders/${vendorId}`,
          params: {page, limit},
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
      providesTags: ['orders']
    }),

    createOffer: builder.mutation<any, any>({
      query: (body) => ({
            url: `/seller-center/distributor-order/`,
            method: 'POST',
            body,
          }
      ),
      //invalidatesTags: [{ type: 'orders' }],
    }),

    editOffer: builder.mutation<any, {id:string, data:any}>({
      query: ({ id, data }) => ({
            url: `/seller-center/distributor-order/${id}`,
            method: 'PUT',
            body: data,
          }
      ),
      //invalidatesTags: [{ type: 'orders' }],
    }),

  })
});

export const {
  useGetDistributorOffersByVendorIdQuery,
  useGetDistributorOffersGroupedByVendorIdQuery,
  useGetDistributorOffersByProductIdQuery,
  useGetMyOrdersByVendorIdQuery,
  useGetDistributorOfferByOfferIdQuery,
  useCreateOfferMutation,
  useEditOfferMutation,
  useGetDistributorAsloSellsQuery,
} = distributorApi;
