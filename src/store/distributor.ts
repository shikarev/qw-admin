import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import SecureLS from "secure-ls";
import {DistributorsOffersGrouped} from "../types/distributors";

const ls = new SecureLS();

function addLocalData(data: any) {
    ls.set('distributor', {...ls.get('distributor'), ...data});
}

function getLocalInt(arg: any) {
    return parseInt(ls.get('distributor')[arg]) || 0;
}

function getLocalString(arg: any) {
    return ls.get('distributor')[arg];
}

// Define a type for the slice state
interface DistributorState {
    products: DistributorsOffersGrouped[];
    selectedDistributorProduct?: any,
    selectedDistributorOffer?: any;
    selectedDistributorItem?: any;
    getSelectedProductOffer?: any,

}

// Define the initial state using that type
const initialState: DistributorState = {
    products: getLocalString('products') ?? [],
    selectedDistributorProduct: getLocalString('selectedDistributorProduct'),
    selectedDistributorOffer: getLocalString('selectedDistributorOffer'),
    selectedDistributorItem: getLocalString('selectedDistributorItem'),
};

export const distributorSlice = createSlice({
    name: 'distributor',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<DistributorsOffersGrouped>) => {
            let currentProducts = state.products
            const found = currentProducts.find(product => product.product.id === action.payload.product.id)
            if(!found) {
                state.products = [...state.products, action.payload];
                addLocalData({products: [...state.products]});
            }
            /*if(state.products.length >= 0) {
                state.products = [action.payload];
            }*/
        },

        clearProducts: (state) => {
            state.products = [];
            addLocalData({products: []});
        },

        /*updatePost: (state, action: PayloadAction<Post>) => {
            state.posts = [action.payload, ...state.posts.filter(post => post.id !== action.payload.id)];
        },*/
        /*clearPosts: (state) => {
            state.posts = [];
            state.offset = 0;
        },*/

        setSelectedDistributorProduct(state, action: PayloadAction<any>){
            addLocalData({selectedDistributorProduct: action.payload});
            state.selectedDistributorProduct = action.payload;
        },
        setSelectedDistributorOffer(state, action: PayloadAction<any>){
            addLocalData({selectedDistributorOffer: action.payload});
            state.selectedDistributorOffer = action.payload;
        },
        setSelectedDistributorItem(state, action: PayloadAction<any>){
            addLocalData({selectedDistributorOffer: action.payload});
            state.selectedDistributorItem = action.payload;
        },
    },
});

export const {setSelectedDistributorProduct} = distributorSlice.actions;
export const {setSelectedDistributorOffer} = distributorSlice.actions;
export const {setSelectedDistributorItem} = distributorSlice.actions;
export const {addProduct, clearProducts} = distributorSlice.actions;


// selectors
export const getSelectedDistributorProduct = (state: RootState) => state.distributor.selectedDistributorProduct;
export const getSelectedDistributorOffer = (state: RootState) => state.distributor.selectedDistributorOffer;
export const getSelectedDistributorItem = (state: RootState) => state.distributor.selectedDistributorItem;
export const getSelectedProductOffer = (state: RootState) => state.distributor;
export const getProducts = (state: RootState) => state.distributor.products;

export default distributorSlice.reducer;