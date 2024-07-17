
import { render, screen } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom/extend-expect'; 

jest.mock('next/image', () => ({ src, alt }: { src: string, alt: string }) => (
  <img src={src} alt={alt} />
));

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByText('Simplify Your Business Expenses with ExpenseXpress')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Home />);
    expect(screen.getByText(/Transform your financial operations with ExpenseXpress./)).toBeInTheDocument();
  });

  it('renders the buttons', () => {
    render(<Home />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders the Invoice Generation section', () => {
    render(<Home />);
    expect(screen.getByText('Invoice Generation')).toBeInTheDocument();
    expect(screen.getByText(/Generate invoices in seconds with our easy-to-use invoice generator./)).toBeInTheDocument();
  });

  it('renders the Expense Tracking section', () => {
    render(<Home />);
    expect(screen.getByText('Expense Tracking')).toBeInTheDocument();
    expect(screen.getByText(/Track expenses effortlessly with ExpenseXpress./)).toBeInTheDocument();
  });

  it('renders the images', () => {
    render(<Home />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
