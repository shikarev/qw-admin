import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { vendorsApi } from '../api/vendors';

interface VendorDocument {
  id: string,
  files: File[]
}

// Define a type for the slice state

interface VendorState {
  documents: VendorDocument[];
}

// Define the initial state using that type
const initialState: VendorState = {
  documents: [],
};

export const addVendor = createAsyncThunk<any, any, { state: RootState }>(
  'addVendor',
  async (data, { dispatch, getState }) => {
    // CREATE VENDOR
    const response = await dispatch(vendorsApi.endpoints.createShop.initiate(data));
    if ('data' in response) {
      const { vendor } = getState();
      //ADD VENDOR DOCS
      for(const doc of vendor.documents) {
        const formData = new FormData();
        doc.files.forEach(file => {
          formData.append('files[]', file);
        });

        await dispatch(vendorsApi.endpoints.uploadDocument.initiate({
          vendorId: response.data.id,
          typeId: doc.id,
          body: formData
        }));
      }


      return response.data;
    }
  }
);

export const editVendor = createAsyncThunk<any, any, { state: RootState }>(
  'addVendor',
  async (data, { dispatch, getState }) => {
    // EDIT VENDOR
    const response = await dispatch(vendorsApi.endpoints.editShop.initiate({id: data.id, data: data.data}));
    if ('data' in response) {
      const { vendor } = getState();
      //ADD VENDOR DOCS
      for(const doc of vendor.documents) {
        const formData = new FormData();
        doc.files.forEach(file => {
          formData.append('files[]', file);
        });

        await dispatch(vendorsApi.endpoints.uploadDocument.initiate({
          vendorId: response.data.id,
          typeId: doc.id,
          body: formData
        }));
      }


      return response.data;
    }
  }
);

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<{ id: string, files: File[] }>) => {
      state.documents = [...state.documents, {id: action.payload.id, files: action.payload.files}];
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(addVendor.fulfilled, (state, action) => {
      // Add user to the state array
    });
  }
});


export const { setDocuments } = vendorSlice.actions;
// selectors
//export const getSelectedShop = (state: RootState) => state.shops.selectedShop;

export default vendorSlice.reducer;