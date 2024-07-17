"use client";

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import { addItem, clearItem } from '../../store/expensesSlice'; 
import { addInvoice } from '../../store/invoiceSlice';
import { generateInvoiceNumber } from '../../utils/generateInvoiceNumber'; 

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const Invoices = () => {
  const [clientName, setClientName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.expenses.items);
  const invoices = useSelector((state: RootState) => state.invoices.invoices);

  const handleAddItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      name: description,
      quantity,
      price,
    };
    dispatch(addItem(newItem));
    setDescription('');
    setQuantity(1);
    setPrice(0);
  };

  const handleClearItem = (id: number) => {
    dispatch(clearItem(id));
  };

  const generateInvoice = async () => {
    try {
      const newInvoiceNumber = generateInvoiceNumber(); 
      setInvoiceNumber(newInvoiceNumber); 

      const newInvoice = {
        id: invoices.length + 1,
        clientName,
        invoiceNumber: newInvoiceNumber, 
        invoiceDate,
        customerEmail,
        items,
      };
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newInvoice);
      setGeneratedInvoice(response.data);
      dispatch(addInvoice(newInvoice));
      alert('Invoice generated successfully!');
      console.log('Invoice generated:', response.data);
    } catch (error) {
      alert('Error generating invoice. Please try again.');
      console.error('Error generating invoice:', error);
    }
  };

  const renderInvoiceItems = () => {
    if (items.length === 0) {
      return null; 
    }

    return (
      <div className="mb-8 mt-8">
        <h2 className="text-xl font-bold mb-2">Invoice Items</h2>
        {items.map((item) => (
          <div key={item.id} className="flex gap-6 mb-4 items-center">
            <span>{item.name} - Quantity: {item.quantity}, Price: N{item.price.toFixed(2)}</span>
            <button onClick={() => handleClearItem(item.id)} className="bg-primary text-white px-4 py-1 rounded-[10px]">
              Clear Item
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderInvoice = () => (
    <div className="bg-white w-1/2 p-6 rounded-[10px] shadow-md text-black my-8">
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>
      <div className="mb-4 px-6">
        <p><strong>Client Name:</strong> {generatedInvoice.clientName}</p>
        <p><strong>Invoice Number:</strong> {generatedInvoice.invoiceNumber}</p> 
        <p><strong>Invoice Date:</strong> {generatedInvoice.invoiceDate}</p>
        <p><strong>Customer Email:</strong> {generatedInvoice.customerEmail}</p>
      </div>
      <h3 className="text-xl font-bold mb-2">Items</h3>
      <ul className="mb-4">
        {generatedInvoice.items.map((item: Item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}, Price: N{item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto text-white my-8">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="mb-8 xl:flex grid grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="bg-secondary border border-white px-4 py-2 rounded-[10px] mr-2"
        />
        <input
          type="date"
          placeholder="Invoice Date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          className="bg-secondary border border-white px-4 py-2 rounded-[10px] mr-2"
        />
        <input
          type="email"
          placeholder="Customer Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="bg-secondary border border-white px-4 py-2 rounded-[10px] mr-2"
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Add Invoice Items</h2>
        <div className="gap-6 xl:flex grid grid-cols-2 mb-2">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-secondary border border-white  px-4 py-2 rounded-[10px] mr-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="bg-secondary border border-white px-4 py-2 rounded-[10px] mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="bg-secondary border border-white px-4 py-2 rounded-[10px] mr-2"
          />
          <button onClick={handleAddItem} className="bg-primary text-white px-4 py-2 rounded-[10px]">
            Add Item
          </button>
        </div>
        {renderInvoiceItems()}
        
      </div>
      <div className="flex items-center justify-center mb-4">
        <button onClick={generateInvoice} className="bg-primary text-white px-4 py-2 my-6 rounded-[10px]">
          Generate Invoice
        </button>
      </div>
      {generatedInvoice && renderInvoice()}
    </div>
  );
};

export default Invoices;
