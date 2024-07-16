"use client";

import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="container mx-auto my-6">
        <div className='flex justify-between  items-center text-white'>
        <h1 className="p-4 text-5xl text-white font-bold text-center hover:text-primary">ExpenseXpress</h1>
        <ul className='flex items-center gap-4 text-xl font-bold'>
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
    </header>
  )
}

export default Header