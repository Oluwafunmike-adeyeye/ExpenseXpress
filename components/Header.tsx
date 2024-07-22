"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="container mx-auto my-6 w-full">
      <div className="flex justify-between items-center text-white">
        <h1 className="p-4 text-3xl xl:text-5xl font-bold text-center hover:text-primary">
          ExpenseXpress
        </h1>
        <div className='flex flex-col items-center'>
          <button
            className="md:hidden p-4 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <AiOutlineClose className="w-6 h-6" /> 
            ) : (
              <GiHamburgerMenu className="w-6 h-6" />
            )}
          </button>
          <ul
            className={`md:flex items-center gap-4 text-base xl:text-xl font-bold transition-transform duration-300 ${
              isOpen ? 'block' : 'hidden'
            } md:block`}
            role="navigation"
          >
            <li className="p-4 hover:text-primary">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4 hover:text-primary">
              <Link href="/expenses">Expenses</Link>
            </li>
            <li className="p-4 hover:text-primary">
              <Link href="/invoices">Invoices</Link>
            </li>
          </ul>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
