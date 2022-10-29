import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { Cookies } from "react-cookie";
import {
    FetchArgs,
    FetchBaseQueryArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const cookie = new Cookies();

export function baseQueryConfig(opts?: FetchBaseQueryArgs): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> {
    return fetchBaseQuery({
        baseUrl: 'http://market.myqwangy.com/v1/',
        prepareHeaders: (headers => {
            if(cookie.get('access_token')) {
                headers.set('Authorization', `Bearer ${cookie.get('access_token')}`);
            }
            return headers;
        }),
        ...opts || {}
    });
}

//eslint-disable-next-line
export default {
    baseQueryConfig
}