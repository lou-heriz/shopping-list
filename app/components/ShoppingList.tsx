'use client';
import ShoppingItem from "./ShoppingItem";
import { ShoppingItemType } from "../types";
import { shoppingListApi } from "../helper/api-interface";
import { useEffect, useState } from "react";
import AddItemButton from "./AddItemButton";
import Modal from "./Modal";
import AddItemForm from "./AddItemForm";
import { v4 as uuid } from 'uuid';
import { Reorder } from "motion/react"

export default function ShoppingList() {

    const [items, setItems] = useState<ShoppingItemType[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await shoppingListApi.getAllItems();
                const itemsWithOrder = data.map((item, index) => ({
                    ...item,
                    order: item.order ?? index
                })).sort((a, b) => a.order - b.order);
                setItems(itemsWithOrder);
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
            order: items.length,
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
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        await shoppingListApi.deleteItem(id);
    };

    const handleTogglePurchased = async (id: string) => {
        const item = items.find(i => i.id === id);

        if (!item) return;

        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
        await shoppingListApi.togglePurchased(item);
    };

    const handleReorder = async (reorderedItems: ShoppingItemType[]) => {
        const itemsWithUpdatedOrder = reorderedItems.map((item, index) => ({
            ...item,
            order: index
        }));

        setItems(itemsWithUpdatedOrder);

        await shoppingListApi.reorderItems(itemsWithUpdatedOrder);
    };

    return (
        <>
            <h1 className="text-4xl font-bold pb-8 text-center">Shopping List</h1>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg items-center flex flex-col gap-2">
                <div className="flex justify-between items-center text-lg">
                    Total Cost: £{items.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </div>
            </div>
            <Reorder.Group aria-label="Shopping List" values={items} onReorder={handleReorder}>
                {items.map(item => (
                    <Reorder.Item key={item.id} value={item} className="flex items-center justify-between p-1 border-b last:border-b-0">
                        <ShoppingItem item={item} onDelete={handleDelete} onTogglePurchased={handleTogglePurchased} />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <AddItemButton openModal={() => setShowModal(true)} />
            {showModal &&
                <Modal onClose={handleCloseModal}>
                    <AddItemForm onSubmit={handleAddItem} onCancel={handleCloseModal} />
                </Modal>
            }
        </>
    );
}