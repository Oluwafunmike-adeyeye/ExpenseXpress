
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: number;
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerEmail: string;
  items: { id: number; name: string; quantity: number; price: number }[];
}

interface InvoicesState {
  invoices: Invoice[];
}

const initialState: InvoicesState = {
  invoices: [],
};


const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice(state, action: PayloadAction<Invoice>) {
      state.invoices.push(action.payload);
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
