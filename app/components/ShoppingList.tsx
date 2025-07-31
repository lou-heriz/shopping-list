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
        { id: "0", name: "Milk", price: 1 },
        { id: "1", name: "Eggs", price: 3 },
        { id: "2", name: "Self-Raising Flour", price: 1.5 },
        { id: "3", name: "Butter", price: 3 },
        { id: "4", name: "Sugar", price: 1 },
        { id: "5", name: "Blueberries", price: 2 },
        { id: "6", name: "Maple Syrup", price: 2 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const onAdd = (name: string, price: number) => {
        const newItem: ShoppingItemType = {
            id: uuid(),
            name,
            price,
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

    return (
        <>
            <h1 className="text-4xl font-bold pb-8 text-center">Shopping List</h1>
            <ul aria-label="Shopping List">
                {items.map(item => (
                    <ShoppingItem key={item.id} item={item} onDelete={handleDelete} />
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