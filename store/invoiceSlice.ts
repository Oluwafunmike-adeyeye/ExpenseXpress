// invoiceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: number;
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerEmail: string;
  items: { id: number; name: string; quantity: number; price: number }[];
}

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    clearInvoices: (state) => {
      state.invoices = [];
    },
  },
});

export const { addInvoice, clearInvoices } = invoiceSlice.actions;

export default invoiceSlice.reducer;
