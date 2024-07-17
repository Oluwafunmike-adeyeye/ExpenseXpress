
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Invoices from './page';
import expensesReducer from '../../store/expensesSlice';
import invoiceReducer from '../../store/invoiceSlice';

jest.mock('axios');

interface RootState {
  expenses: {
    items: Item[];
  };
  invoices: {
    invoices: any[];
  };
}

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const createStore = (initialState: RootState): EnhancedStore =>
  configureStore({
    reducer: {
      expenses: expensesReducer,
      invoices: invoiceReducer,
    },
    preloadedState: initialState,
  });

describe('Invoices Component', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = createStore({
      expenses: {
        items: [],
      },
      invoices: {
        invoices: [],
      },
    });
  });

  it('renders component with input fields and buttons', () => {
    render(
      <Provider store={store}>
        <Invoices />
      </Provider>
    );

    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Client Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Invoice Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Customer Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    expect(screen.getByText('Generate Invoice')).toBeInTheDocument();
  });

  it('adds an item to invoice items list', () => {
    render(
      <Provider store={store}>
        <Invoices />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '10' } });

    fireEvent.click(screen.getByText('Add Item'));

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2, Price: N10.00')).toBeInTheDocument();
  });

  it('generates an invoice successfully', async () => {
    render(
      <Provider store={store}>
        <Invoices />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Client Name'), { target: { value: 'Test Client' } });
    fireEvent.change(screen.getByPlaceholderText('Invoice Date'), { target: { value: '2024-07-17' } });
    fireEvent.change(screen.getByPlaceholderText('Customer Email'), { target: { value: 'test@example.com' } });

    const mockInvoice = {
      id: 1,
      clientName: 'Test Client',
      invoiceNumber: 'INV-001',
      invoiceDate: '2024-07-17',
      customerEmail: 'test@example.com',
      items: [],
    };

    const mockResponse = { data: mockInvoice };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    fireEvent.click(screen.getByText('Generate Invoice'));

    await waitFor(() => {
      expect(screen.getByText('Invoice')).toBeInTheDocument();
      expect(screen.getByText('Client Name: Test Client')).toBeInTheDocument();
      expect(screen.getByText('Invoice Number: INV-001')).toBeInTheDocument();
      expect(screen.getByText('Invoice Date: 2024-07-17')).toBeInTheDocument();
      expect(screen.getByText('Customer Email: test@example.com')).toBeInTheDocument();
    });
  });

  it('handles error when generating invoice', async () => {
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <Invoices />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Client Name'), { target: { value: 'Test Client' } });
    fireEvent.change(screen.getByPlaceholderText('Invoice Date'), { target: { value: '2024-07-17' } });
    fireEvent.change(screen.getByPlaceholderText('Customer Email'), { target: { value: 'test@example.com' } });

    const mockError = new Error('Failed to generate invoice');
    (axios.post as jest.Mock).mockRejectedValueOnce(mockError);

    fireEvent.click(screen.getByText('Generate Invoice'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error generating invoice. Please try again.');
    });
  });
});
