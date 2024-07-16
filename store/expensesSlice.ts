
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface ExpensesState {
  items: Item[];
}

const initialState: ExpensesState = {
  items: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    clearItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearItem, clearItems } = expensesSlice.actions;

export default expensesSlice.reducer;
