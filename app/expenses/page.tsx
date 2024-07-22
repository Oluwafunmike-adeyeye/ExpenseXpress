"use client";

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addItem, clearItems } from '../../store/expensesSlice';

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const Expenses: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => (state as any).expenses);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (name.trim() === '' || quantity.trim() === '' || price.trim() === '') {
      alert("Please fill out all fields.");
      return;
    }

    const newItem: Item = {
      id: items.length + 1,
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    dispatch(addItem(newItem));
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className='container mx-auto my-8 text-white py-8'>
      <h1 className="text-2xl font-bold mb-2 hover:text-primary">Expenses</h1>
      <div className='my-5 py-8 px-2'>
        <div className='grid grid-cols-2 xl:flex gap-8 py-8'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary border-2 border-white rounded-[10px] px-2 py-2 mr-2"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="bg-secondary border-2 border-white rounded-[10px] px-2 py-2 mr-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-secondary border-2 border-white rounded-[10px] px-2 py-2 mr-2"
          />
          <button onClick={handleAddItem} className="bg-primary text-white px-2 py-2 rounded-[10px]">
            Add Item
          </button>
        </div>
        {loading && <p>Loading expenses...</p>}
        {error && <p>Error: {error}</p>}
        <table className="w-full table-auto mb-2 border-collapse">
          <thead>
            <tr className="bg-secondary text-left">
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Quantity</th>
              <th className="px-2 py-2">Price</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: Item) => (
              <tr key={item.id}>
                <td className="px-2 py-2">{item.id}</td>
                <td className="px-2 py-2">{item.name}</td>
                <td className="px-2 py-2">{item.quantity}</td>
                <td className="px-2 py-2">{item.price.toFixed(2)}</td>
                <td className="px-2 py-2">
                  <button
                    className="bg-primary text-white px-2 py-1 rounded-[10px]"
                    onClick={() => dispatch(clearItems())}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
