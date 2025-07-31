'use client';
import ShoppingItem from "./ShoppingItem";
import { ShoppingItemType } from "../types";
import { useState } from "react";
import AddItemButton from "./AddItemButton";
import Modal from "./Modal";
import AddItemForm from "./AddItemForm";
import { v4 as uuid } from 'uuid';

export default function ShoppingList() {

    const [items, setItems] = useState<ShoppingItemType[]>([
        { id: "0", name: "Milk", price: 1, purchased: false },
        { id: "1", name: "Eggs", price: 3, purchased: false },
        { id: "2", name: "Self-Raising Flour", price: 1.5, purchased: false },
        { id: "3", name: "Butter", price: 3, purchased: false },
        { id: "4", name: "Sugar", price: 1, purchased: false },
        { id: "5", name: "Blueberries", price: 2, purchased: false },
        { id: "6", name: "Maple Syrup", price: 2, purchased: false },
    ]);

    const [showModal, setShowModal] = useState(false);
    const onAdd = (name: string, price: number) => {
        const newItem: ShoppingItemType = {
            id: uuid(),
            name,
            price,
            purchased: false,
        };
        setItems([...items, newItem]);
    };
    const handleAddItem = (name: string, price: number) => {
        onAdd(name, price);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleTogglePurchased = async (id: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, purchased: !item.purchased } : item
            )
        );
    };

    return (
        <>
            <h1 className="text-4xl font-bold pb-8 text-center">Shopping List</h1>
            <ul aria-label="Shopping List">
                {items.map(item => (
                    <ShoppingItem key={item.id} item={item} onDelete={handleDelete} onTogglePurchased={handleTogglePurchased} />
                ))}
            </ul>
            <AddItemButton openModal={() => setShowModal(true)} />
            {showModal &&
                <Modal onClose={handleCloseModal}>
                    <AddItemForm onSubmit={handleAddItem} onCancel={handleCloseModal} />
                </Modal>
            }
        </>
    );
}