import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../product/product';
import {RootState} from '../../store';

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: [],
};

const slice = createSlice({
  name: 'productOrder',
  initialState,
  reducers: {
    // Set
    setOrderProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        product => product.id === action.payload.id,
      );

      if (index === -1) {
        // New
        state.products.push(action.payload);
      } else {
        // Update
        state.products[index] = action.payload;
      }
    },
    // Remove
    removeOrderProduct: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        product => product.id === action.payload,
      );

      if (index !== -1) {
        // Remove
        state.products.slice(index, 1);
      }
    },
    // Clear
    clearOrderProduct: state => {
      state.products = [];
    },
  },
  extraReducers: builder => {},
});

export default slice.reducer;

export const {} = slice.actions;

export const selectedOrderProducts = (state: RootState): Product[] =>
  state.productOrder.products;
