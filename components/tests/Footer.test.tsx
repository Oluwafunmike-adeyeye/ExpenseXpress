import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  const props = {
    email: 'info@example.com',
    phone: '+123-456-7890',
    aboutUsLink: '/about',
    contactUsLink: '/contact',
    servicesLink: '/services',
    faqsLink: '/faqs',
    privacyLink: '/privacy',
    termsLink: '/terms',
    blogLink: '/blog',
    careersLink: '/careers',
    year: new Date().getFullYear(),
  };

  it('renders contact information correctly', () => {
    render(<Footer {...props} />);

    expect(screen.getByText(props.email)).toBeInTheDocument();
    expect(screen.getByText(props.phone)).toBeInTheDocument();
  });

  it('renders all links correctly', () => {
    render(<Footer {...props} />);

    expect(screen.getByText('About Us')).toHaveAttribute('href', props.aboutUsLink);
    expect(screen.getByText('Contact Us')).toHaveAttribute('href', props.contactUsLink);
    expect(screen.getByText('Services')).toHaveAttribute('href', props.servicesLink);
    expect(screen.getByText('FAQs')).toHaveAttribute('href', props.faqsLink);
    expect(screen.getByText('Privacy')).toHaveAttribute('href', props.privacyLink);
    expect(screen.getByText('Terms')).toHaveAttribute('href', props.termsLink);
    expect(screen.getByText('Blog')).toHaveAttribute('href', props.blogLink);
    expect(screen.getByText('Careers')).toHaveAttribute('href', props.careersLink);
  });

  it('renders the current year correctly', () => {
    render(<Footer {...props} />);
    
    expect(screen.getByText(`© ${props.year}. All rights reserved.`)).toBeInTheDocument();
  });
});
