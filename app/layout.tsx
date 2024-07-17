"use client";

import './globals.css';
import { JetBrains_Mono } from "next/font/google";
import { Provider } from 'react-redux';
import store from '../store';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono', 
});

const Layout = ({ children }: LayoutProps) => {
  const footerProps = {
    email: "info@example.com",
    phone: "+123-456-7890",
    aboutUsLink: "/about",
    contactUsLink: "/contact",
    servicesLink: "/services",
    faqsLink: "/faqs",
    privacyLink: "/privacy",
    termsLink: "/terms",
    blogLink: "/blog",
    careersLink: "/careers",
    year: new Date().getFullYear(),
  };

  return (
    <Provider store={store}>
      <html lang="en">
        <body className={jetbrainsMono.variable}>
          <Header />
          {children}
          <Footer {...footerProps} />
        </body>
      </html>
    </Provider>
  );
}

export default Layout;
