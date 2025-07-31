'use client';
import ShoppingItem from "./ShoppingItem";
import { ShoppingItemType } from "../types";
import { shoppingListApi } from "../helper/api-interface";
import { useEffect, useState } from "react";
import AddItemButton from "./AddItemButton";
import Modal from "./Modal";
import AddItemForm from "./AddItemForm";
import { v4 as uuid } from 'uuid';

export default function ShoppingList() {

    const [items, setItems] = useState<ShoppingItemType[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await shoppingListApi.getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Failed to load items:', error);
            }
        };
        loadItems();
    }, []);

    const onAdd = async (name: string, price: number) => {
        const newItem: ShoppingItemType = {
            id: uuid(),
            name,
            price,
            purchased: false,
        };

        setItems(prevItems => [...prevItems, newItem]);
        await shoppingListApi.addItem(newItem);
    };

    const handleAddItem = (name: string, price: number) => {
        onAdd(name, price);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async (id: string) => {
        const itemToDelete = items.find(item => item.id === id);
        const index = items.findIndex(item => item.id === id);
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        await shoppingListApi.deleteItem(id);
    };

    const handleTogglePurchased = async (id: string) => {
        const item = items.find(i => i.id === id);

        if (!item) return;

        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
        await shoppingListApi.togglePurchased(item);
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