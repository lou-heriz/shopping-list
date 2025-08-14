'use client';

import { useState } from 'react';
import { useListActions } from '../provider/ListContext';

export default function AddItemForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(1);
    const { handleAddItem, closeModal } = useListActions();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddItem(name.trim(), price);
        setName('');
        setPrice(1);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">Add New Item</h2>

            <div>
                <label htmlFor="item-name" className="text-sm text-gray-600">Item Name</label>
                <input
                    type="text"
                    name="name"
                    id="item-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-4 py-2 rounded w-full mt-1"
                    placeholder="Enter item name"
                    autoFocus
                />
            </div>

            <div>
                <label id="price-label" className="text-sm text-gray-600">Price</label>
                <div className="flex items-center justify-between">
                    <button
                        aria-label="Decrement price"
                        id="decrement-button"
                        type="button"
                        onClick={() => setPrice(Math.max(0.5, price - 0.5))}
                        className="bg-gray-200 text-gray-700 w-11 h-11 rounded flex items-center justify-center"
                        disabled={price <= 0.5}
                    >
                        −
                    </button>
                    <span id="add-item-form-price" role="status" aria-live="polite" aria-labelledby="price-label" className="px-4 py-2 rounded text-center min-w-20">
                        £{price.toFixed(2)}
                    </span>
                    <button
                        aria-label="Increment price"
                        id="increment-button"
                        type="button"
                        onClick={() => setPrice(price + 0.5)}
                        className="bg-gray-200 text-gray-700 w-11 h-11 rounded flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="text-sm text-gray-600 underline px-4 py-2"
                    aria-label="Cancel adding item"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={!name.trim() || price <= 0}
                    aria-label="Submit add item form"
                >
                    Add Item
                </button>
            </div>
        </form>
    );
}
