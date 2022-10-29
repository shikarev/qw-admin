import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../api/products';
import { RootState } from './index';
import { currencies } from '../types/products';

// Define a type for the slice state
interface ProductState {
  media?: File[];
}

// Define the initial state using that type
const initialState: ProductState = {
  media: []
};

export const addVendorProduct = createAsyncThunk<any, any, { state: RootState }>(
  'products',
  async (data, { dispatch, getState }) => {

    //CREATE PRODUCT GLOBALLY
    const productData = (({ name, description, category, manufacturer }) => ({
      name,
      description,
      category,
      manufacturer
    }))(data);

    const response = await dispatch(productsApi.endpoints.createProduct.initiate(productData));
    if ('data' in response) {

      const { product } = getState();
      const { shops } = getState();

      //ADD PRODUCT TO VENDOR
      if (shops.selectedShop) {
        const res = await dispatch(productsApi.endpoints.addProductToVendor.initiate({
          product: response.data.id,
          vendor: shops.selectedShop.vendor.id
        }));
        if ('error' in res) {
          return res.error;
        }
      }

      //ADD PRODUCT PRICE
      if (shops.selectedShop) {
        const priceData = (({ cost, oldCost, startDate, endDate }) => ({ cost, oldCost, startDate, endDate }))(data);
        await dispatch(productsApi.endpoints.addProductPrice.initiate({
          vendor: shops.selectedShop.vendor.id,
          status: 'active',
          currency: currencies.rub,
          product: response.data.id,
          cost: priceData.cost,
          oldCost: priceData.oldCost,
          startDate: priceData.startDate,
          endDate: priceData.endDate,
          code: Date.now().toString()
        }));
      }

      //ADD PRODUCT MEDIA
      if (product.media) {
        let formData = new FormData();
        for (let i = 0; i < product.media.length; i++) {
          formData.append('files[]', product.media[i]);
        }
        await dispatch(productsApi.endpoints.uploadProductMedia.initiate({
          id: response.data.id,
          body: formData
        }));
      }

      return response.data
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setMediaFile: (state, action: PayloadAction<File[]>) => {
      state.media = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(addVendorProduct.fulfilled, (state, action) => {
      // Add user to the state array
    });
  }
});


export const { setMediaFile } = productSlice.actions;
// selectors
//export const getSelectedShop = (state: RootState) => state.shops.selectedShop;

export default productSlice.reducer;