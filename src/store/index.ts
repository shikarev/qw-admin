import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {productsApi} from '../api/products';
import {shopsSlice} from './shops';
import {vendorsApi} from '../api/vendors';
import {productSlice} from './product';
import {userApi} from '../api/user';
import {vendorSlice} from './vendor';
import {feedbackApi} from "../api/feedback";
import {questionsApi} from "../api/questions";
import {questionsSlice} from "./questions";
import {distributorApi} from "../api/distributors";
import {distributorSlice} from "./distributor";

export const store = configureStore({
    reducer: {
        // Api's
        [productsApi.reducerPath]: productsApi.reducer,
        [questionsApi.reducerPath]: questionsApi.reducer,
        [vendorsApi.reducerPath]: vendorsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [distributorApi.reducerPath]: distributorApi.reducer,
        // Slices
        [shopsSlice.name]: shopsSlice.reducer,
        [productSlice.name]: productSlice.reducer,
        [vendorSlice.name]: vendorSlice.reducer,
        [questionsSlice.name]: questionsSlice.reducer,
        [distributorSlice.name]: distributorSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApi.middleware,
            vendorsApi.middleware,
            userApi.middleware,
            feedbackApi.middleware,
            questionsApi.middleware,
            distributorApi.middleware,
        )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
