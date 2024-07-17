
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import expensesReducer from '../../store/expensesSlice';
import Expenses from './page';
import '@testing-library/jest-dom/extend-expect';


interface RootState {
  expenses: {
    items: Array<{ id: number; name: string; quantity: number; price: number }>;
    loading: boolean;
    error: string | null;
  };
}


const createStore = (initialState: RootState): EnhancedStore =>
  configureStore({
    reducer: {
      expenses: expensesReducer,
    },
    preloadedState: initialState,
  });

describe('Expenses Page', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = createStore({
      expenses: {
        items: [],
        loading: false,
        error: null,
      },
    });
  });

  it('renders the main heading', () => {
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('renders the input fields and button', () => {
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('displays error message if input fields are empty and Add Item is clicked', () => {
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );

    window.alert = jest.fn();

    fireEvent.click(screen.getByText('Add Item'));

    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields.');
  });

  it('adds an item when input fields are filled and Add Item is clicked', () => {
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '10' } });

    fireEvent.click(screen.getByText('Add Item'));

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
  });

  it('renders loading and error messages correctly', () => {
    const loadingStore = createStore({
      expenses: {
        items: [],
        loading: true,
        error: null,
      },
    });

    const errorStore = createStore({
      expenses: {
        items: [],
        loading: false,
        error: 'Failed to fetch expenses',
      },
    });

    const { rerender } = render(
      <Provider store={loadingStore}>
        <Expenses />
      </Provider>
    );

    expect(screen.getByText('Loading expenses...')).toBeInTheDocument();

    rerender(
      <Provider store={errorStore}>
        <Expenses />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to fetch expenses')).toBeInTheDocument();
  });
});
