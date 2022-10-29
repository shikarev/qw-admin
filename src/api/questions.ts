import {createApi} from '@reduxjs/toolkit/query/react'
import api from "../utils/api";
import {ListResponse} from '../types/api';
import {underlineToCamelDeep} from '../utils/caseConverter';
import {IQuestion} from "../types/questions";

export const questionsApi = createApi({
    reducerPath: 'questions',
    tagTypes: ['questions','notes'],
    baseQuery: api.baseQueryConfig(),
    endpoints: (builder) => ({
        getVendorQuestions: builder.query<ListResponse<IQuestion>, { id?: string, params: { page?: string, limit?: string } }>({
            query: ({id, params}) => {
                return {
                    url: `questions/by-vendor/${id}`,
                    params
                }
            },
            transformResponse: (resp: any) => ({
                pageCount: resp['page-count'],
                total: resp.total,
                data: resp.data.map((item: typeof Object) => ({...underlineToCamelDeep(item)}))
            })
        }),
    }),
})

export const {
    useGetVendorQuestionsQuery,
} = questionsApi
