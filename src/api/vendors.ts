import {createApi} from '@reduxjs/toolkit/query/react'
import api from "../utils/api";
import { ListResponse } from '../types/api';
import {
  IVendorUser,
  MyShops,
  Vendor,
  VendorDocTypes,
  VendorFullInfo,
  VendorNativeTypes,
  VendorOrgFormTypes,
  Vendors
} from '../types/vendors';
import { camelToUnderline, underlineToCamelDeep } from '../utils/caseConverter';

export const vendorsApi = createApi({
  reducerPath: 'vendors',
  tagTypes: ['vendors', 'shop', 'users'],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getAllVendors: builder.query<ListResponse<Vendors>, { page?: number, limit?: number }>({
      query: ({page, limit}) => {
        return {
          url: `seller-centers/`,
          params: {page, limit},
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      })
    }),

    getDocumentsType: builder.query<VendorDocTypes[], any>({
      query: () => {
        return {
          url: `seller-center/vendor-native-types/document/`,
        }
      },
    }),

    getOrgFormsType: builder.query<ListResponse<VendorOrgFormTypes>, any>({
      query: () => {
        return {
          url: `org-forms/`,
        }
      },
    }),

    uploadDocument: builder.mutation<any, { body: any, vendorId: string, typeId: string }>({
      query: ({ body, vendorId, typeId }) => ({
          url: `seller-center/media/vendor-document/upload/${vendorId}/${typeId}`,
          method: 'POST',
          body
        }
      ),
    }),

    getMyShops: builder.query<ListResponse<MyShops>, { page?: number, limit?: number }>({
      query: (params) => {
        return {
          url: `seller-center/vendor-users/my-shops`,
          params,
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
      providesTags: ['vendors']
    }),

    getVendor: builder.query<VendorFullInfo, string>({
      query: (query) => {
        return {
          url: `seller-center/${query}`,
        }
      },
      transformResponse: (resp:any) => ({
          ...underlineToCamelDeep(resp)
      }),
      providesTags: ['shop']
    }),

    createShop: builder.mutation<any, Vendor>({
      query: (body) => ({
          url: `seller-center/`,
          method: 'POST',
            body: {...camelToUnderline(body)}
        }
      ),
      invalidatesTags: ['vendors']
    }),

    editShop: builder.mutation<any, {id:string, data:Vendor}>({
      query: ({ id, data }) => ({
          url: `seller-center/${id}`,
          method: 'PUT',
          body: {...camelToUnderline(data)}
        }
      ),
      invalidatesTags: ['vendors', 'shop']
    }),

    deleteShop: builder.mutation<any, {id:string}>({
      query: ({ id }) => ({
            url: `seller-center/${id}`,
            method: 'DELETE',
          }
      ),
      invalidatesTags: ['vendors', 'shop']
    }),

    getVendorUsers: builder.query<ListResponse<any>, { id: string, page?: number, limit?: number }>({
      query: ({id, page, limit}) => {
        return {
          url: `seller-center/vendor-users/${id}`,
          params: {page, limit},
        }
      },
      transformResponse: (resp:any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:typeof Object) => ({...underlineToCamelDeep(item)}))
      }),
      providesTags: ['users'],
    }),

    inviteVendorUser: builder.mutation<any, IVendorUser>({
      query: (body) => ({
            url: `seller-center/vendor-user/`,
            method: 'POST',
            body: {...body}
          }
      ),
      invalidatesTags: ['users']
    }),

    deleteUser: builder.mutation<any, string>({
      query: ( id ) => ({
            url: `seller-center/vendor-user/${id}`,
            method: 'DELETE',
          }
      ),
      invalidatesTags: ['users']
    }),

    getVendorNativeType: builder.query<VendorNativeTypes[], any>({
      query: () => {
        return {
          url: `seller-center/vendor-native-types/user/`,
        }
      },
    }),

  }),
})

export const {
  useGetAllVendorsQuery,
  useGetMyShopsQuery,
  useGetVendorQuery,
  useGetOrgFormsTypeQuery,
  useGetDocumentsTypeQuery,
  useGetVendorNativeTypeQuery,
  useDeleteShopMutation,
  useGetVendorUsersQuery,
  useInviteVendorUserMutation,
  useDeleteUserMutation,
} = vendorsApi
