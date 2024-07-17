import Link from 'next/link';

interface FooterProps {
  email: string;
  phone: string;
  aboutUsLink: string;
  contactUsLink: string;
  servicesLink: string;
  faqsLink: string;
  privacyLink: string;
  termsLink: string;
  blogLink: string;
  careersLink: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({
  email,
  phone,
  aboutUsLink,
  contactUsLink,
  servicesLink,
  faqsLink,
  privacyLink,
  termsLink,
  careersLink,
  blogLink,
  year,
}) => {
  return (
    <footer className="rounded-[25px] bg-primary px-10 font-semibold text-white text-xl py-8 flex items-center justify-center">
      <div className="flex gap-[100px]">
        <div>
          <h3 className="mb-2">Contact Information</h3>
          <ul>
            <li>{email}</li>
            <li>{phone}</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2">Links</h3>
          <ul>
            <li><Link href={aboutUsLink} className="text-white hover:text-white">About Us</Link></li>
            <li><Link href={contactUsLink} className="text-white hover:text-white">Contact Us</Link></li>
            <li><Link href={servicesLink} className="text-white hover:text-white">Services</Link></li>
            <li><Link href={faqsLink} className="text-white hover:text-white">FAQs</Link></li>
            <li><Link href={privacyLink} className="text-white hover:text-white">Privacy</Link></li>
            <li><Link href={termsLink} className="text-white hover:text-white">Terms</Link></li>
            <li><Link href={blogLink} className="text-white hover:text-white">Blog</Link></li>
            <li><Link href={careersLink} className="text-white hover:text-white">Careers</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-base">&copy; {year}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
