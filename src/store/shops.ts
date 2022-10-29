import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { MyShops } from '../types/vendors';

// Define a type for the slice state
interface ShopsState {
  selectedShop?: MyShops;
}

// Define the initial state using that type
const initialState: ShopsState = {

};

export const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setSelectedShop(state, action: PayloadAction<MyShops | undefined>){
      state.selectedShop = action.payload;
    },
  },
});

export const {setSelectedShop} = shopsSlice.actions;
// selectors
export const getSelectedShop = (state: RootState) => state.shops.selectedShop;

export default shopsSlice.reducer;