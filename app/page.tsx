"use client";

import Image from "next/image";

const Home = () => {
  return (
      <div className="container mx-auto h-full my-12 bg-secondary">
        <div className="flex flex-col items-center justify-center px-2 text">
          <h2 className='font-extrabold py-8 w-[1000px] text-center text-6xl text-primary'>Simplify Your Business Expenses with ExpenseXpress</h2>
          <p className="text-center px-4 py-4 w-[700px] text-xl">Transform your financial operations with ExpenseXpress. Stay on top of your finances with ease, whether you're managing invoices, or tracking expenses. </p>
          <div className="flex gap-6 py-6 text-xl">
            <button className="bg-primary px-4 py-2 rounded-[20px] hover:bg-secondary hover:border hover:border-white">Sign in</button>
            <button className="bg-secondary border border-white px-4 py-2 rounded-[20px] hover:bg-primary hover:border-none">Sign up</button>
          </div>
        </div>
        <div className="flex justify-between border-4 border-primary h-[100%] rounded-[25px] my-12 px-6 py-6">
          <div className="w-1/2">
            <h2 className="text-3xl text-primary py-8 font-bold">Invoice Generation</h2>
            <p>Generate invoices in seconds with our easy-to-use invoice generator. Simply enter your customer details, select items or services rendered, and customize the invoice as needed.</p>
          </div>
          <Image src="/assets/invoice.png" width={500} height={700} alt="" />
        </div>
        <div className="flex justify-between border-4 border-primary h-[100%] rounded-[25px] my-12 px-6 py-6">
          <div className="w-1/2">
            <h2 className="text-3xl text-primary py-8 font-bold">Expense Tracking</h2>
            <p>Track expenses effortlessly with ExpenseXpress. Capture and categorize expenditures swiftly, gain insights into spending trends, and streamline financial management. Simply input transaction details, monitor cash flow, and optimize budgeting with ease.</p>
          </div>
          <Image src="/assets/expense.png" width={500} height={400} alt="" />
        </div>
        
      </div>
  );
}

export default Home;
