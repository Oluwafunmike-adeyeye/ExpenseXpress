import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const MockedHeader = () => <div>Header</div>;
MockedHeader.displayName = 'Header';
jest.mock('../components/Header', () => MockedHeader);


const MockedFooter = (props: any) => (
  <div>
    <div>Footer</div>
    <div>{props.email}</div>
    <div>{props.phone}</div>
    <div>{props.aboutUsLink}</div>
    <div>{props.contactUsLink}</div>
    <div>{props.servicesLink}</div>
    <div>{props.faqsLink}</div>
    <div>{props.privacyLink}</div>
    <div>{props.termsLink}</div>
    <div>{props.blogLink}</div>
    <div>{props.careersLink}</div>
    <div>{props.year}</div>
  </div>
);
MockedFooter.displayName = 'Footer';
jest.mock('../components/Footer', () => MockedFooter);

const store = configureStore({ reducer: {} });

describe('Layout', () => {
  it('renders Header, children, and Footer', () => {
    render(
      <Provider store={store}>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Provider>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies the correct font class', () => {
    const { container } = render(
      <Provider store={store}>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Provider>
    );

    expect(container.querySelector('body')).toHaveClass('--font-jetbrainsMono');
  });
});
