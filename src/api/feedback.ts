import {createApi} from '@reduxjs/toolkit/query/react'
import api from "../utils/api";
import {ListResponse} from '../types/api';
import {underlineToCamelDeep} from '../utils/caseConverter';
import {IFeedBack, INote} from "../types/feedback";

export const feedbackApi = createApi({
    reducerPath: 'feedback',
    tagTypes: ['feedbacks','notes'],
    baseQuery: api.baseQueryConfig(),
    endpoints: (builder) => ({
        getVendorFeedback: builder.query<ListResponse<any>, { id?: string, params: { page?: number, limit?: number } }>({
            query: ({id, params}) => {
                return {
                    url: `feedbacks/by-vendor/${id}`,
                    params
                }
            },
            transformResponse: (resp: any) => ({
                pageCount: resp['page-count'],
                total: resp.total,
                data: resp.data.map((item: typeof Object) => ({...underlineToCamelDeep(item)}))
            })
        }),
        getFeedbackById: builder.query<IFeedBack, string>({
            query: (query) => {
                return {
                    url: `feedback/${query}`
                }
            },
            transformResponse: (resp: any) => ({...underlineToCamelDeep(resp)})
        }),
        getFeedbackNotes: builder.query<ListResponse<INote>, string>({
            query: (query) => {
                return {
                    url: `feedback-notes/${query}`
                }
            },
            transformResponse: (resp: any) => ({
                pageCount: resp['page-count'],
                total: resp.total,
                data: resp.data.map((item: typeof Object) => ({...underlineToCamelDeep(item)}))
            }),
            providesTags: ['notes']
        }),
        addFeedbackNote: builder.mutation<any,any>({
            query: (body) => ({
                url: `feedback-note/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['notes']
        }),
        deleteFeedbackNote: builder.mutation<any,string>({
            query: (id) => ({
                url: `feedback-note/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['notes']
        }),
    }),
})

export const {
    useGetVendorFeedbackQuery,
    useGetFeedbackByIdQuery,
    useGetFeedbackNotesQuery,
    useAddFeedbackNoteMutation,
    useDeleteFeedbackNoteMutation,
} = feedbackApi
