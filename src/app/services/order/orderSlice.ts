import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../product/product';
import {RootState} from '../../store';
import {addProductOrder} from './order';
import {OrderDraftProduct} from '../../../database/tables/orderDraft.table';

export interface OrderProduct extends Product {
  inputAmount: string | '';
}

interface InitialState {
  products: OrderProduct[];
  draftProducts: OrderDraftProduct[];
}

const initialState: InitialState = {
  products: [],
  draftProducts: [],
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
    // Set
    setOrderDraftProduct: (state, action: PayloadAction<OrderDraftProduct>) => {
      const index = state.draftProducts.findIndex(
        product => product.id === action.payload.id,
      );

      if (index === -1) {
        // New
        state.draftProducts.push(action.payload);
      } else {
        // Update
        state.draftProducts[index] = action.payload;
      }
    },
    // Set multiple products
    setOrderDraftProductMultiple: (
      state,
      action: PayloadAction<OrderDraftProduct[]>,
    ) => {
      state.draftProducts = action.payload;
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
    // Remove
    removeOrderDraftProduct: (state, action: PayloadAction<string>) => {
      const index = state.draftProducts.findIndex(
        product => product.id === action.payload,
      );

      if (index !== -1) {
        // Remove
        state.draftProducts.splice(index, 1);
      }
    },
    // Clear
    clearOrderProduct: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      // Add order success
      .addMatcher(addProductOrder.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          Object.assign(state, initialState);
        }
      });
  },
});

export default slice.reducer;

export const {
  setOrderProduct,
  setOrderDraftProduct,
  setOrderDraftProductMultiple,
  removeOrderDraftProduct,
  removeOrderProduct,
  clearOrderProduct,
} = slice.actions;

// Order
export const selectedOrderProducts = (state: RootState): OrderProduct[] => {
  return state.productOrder.products;
};
export const selectedOrderProductsById = (
  state: RootState,
  id: string,
): OrderProduct => {
  return state.productOrder.products.find(
    (item: OrderProduct) => item.id === id,
  );
};
export const selectedOrderProductsAmount = (state: RootState): number => {
  return state.productOrder.products.length;
};

// Order Draft
export const selectedOrderDraftProducts = (
  state: RootState,
): OrderDraftProduct[] => {
  return state.productOrder.draftProducts;
};
export const selectedOrderDraftProductsById = (
  state: RootState,
  id: string,
): OrderDraftProduct | undefined => {
  return state.productOrder.draftProducts?.find(
    (item: OrderDraftProduct) => item.id === id,
  );
};
export const selectedOrderDraftProductsAmount = (state: RootState): number => {
  return state.productOrder.draftProducts.length;
};
