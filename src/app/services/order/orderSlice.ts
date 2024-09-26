import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../product/product';
import {RootState} from '../../store';

interface OrderProduct extends Product {
  inputAmount: number;
}

interface InitialState {
  products: OrderProduct[];
}

const initialState: InitialState = {
  products: [],
};

const slice = createSlice({
  name: 'productOrder',
  initialState,
  reducers: {
    // Set
    setOrderProduct: (state, action: PayloadAction<OrderProduct>) => {
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
        state.products.splice(index, 1);
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

export const {setOrderProduct, removeOrderProduct, clearOrderProduct} =
  slice.actions;

export const selectedOrderProducts = (state: RootState): OrderProduct[] =>
  state.productOrder.products;
export const selectedOrderProductsAmount = (state: RootState): number =>
  state.productOrder.products.length;
