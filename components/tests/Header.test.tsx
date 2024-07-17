import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the header title correctly', () => {
    render(<Header />);

    expect(screen.getByText('ExpenseXpress')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    render(<Header />);

    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Expenses')).toHaveAttribute('href', '/expenses');
    expect(screen.getByText('Invoices')).toHaveAttribute('href', '/invoices');
  });
});
