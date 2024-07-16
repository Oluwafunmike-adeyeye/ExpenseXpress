import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice'; 
import invoiceReducer from './invoiceSlice'; 

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
