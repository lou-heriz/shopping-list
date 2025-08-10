'use client';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { ShoppingItemType } from "../types";
import { v4 as uuid } from 'uuid';
import { shoppingListApi } from "../helper/api-interface";

const ListStateContext = createContext<{
    items: ShoppingItemType[];
    showModal: boolean;
} | null>(null);

const ListActionContext = createContext<{
    closeModal: () => void;
    loadItems: () => void;
    setShowModal: (show: boolean) => void;
    handleAddItem: (name: string, price: number) => void;
    handleDelete: (id: string) => void;
    handleTogglePurchased: (id: string) => void;
    handleReorder: (items: ShoppingItemType[]) => void;
} | null>(null);

export function ListProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ShoppingItemType[]>([]);
    const [showModal, setShowModal] = useState(false);

    const loadItems = useCallback(async () => {
        const data = await shoppingListApi.getAllItems();
        setItems(data);
    }, []);

    const handleAddItem = useCallback(async (name: string, price: number) => {
        const newItem: ShoppingItemType = {
            id: uuid(),
            name,
            price,
            purchased: false,
            order: items.length,
        };
        const rollbackItems = [...items];
        setItems(prevItems => [...prevItems, newItem]);
        setShowModal(false);
        try {
            await shoppingListApi.addItem(newItem);
        } catch (error) {
            console.error("Failed to add item: ", error);
            setItems(rollbackItems);
        }
    }, [items]);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        const rollbackItems = [...items];
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        try {
            await shoppingListApi.deleteItem(id);
        } catch (error) {
            console.error("Failed to delete item: ", error);
            setItems(rollbackItems);
        }
    }, [items]);

    const handleTogglePurchased = useCallback(async (id: string) => {
        const item = items.find(i => i.id === id);

        if (!item) return;
        const rollbackItems = [...items];

        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
        try {
            await shoppingListApi.togglePurchased(item);
        } catch (error) {
            console.error("Failed to toggle purchased status: ", error);
            setItems(rollbackItems);
        }
    }, [items]);

    const handleReorder = useCallback(async (reorderedItems: ShoppingItemType[]) => {
        const itemsWithUpdatedOrder = reorderedItems.map((item, index) => ({
            ...item,
            order: index
        }));
        const rollbackItems = [...items];
        setItems(itemsWithUpdatedOrder);

        try {
            await shoppingListApi.reorderItems(itemsWithUpdatedOrder);
        } catch (error) {
            console.error("Failed to reorder items: ", error);
            setItems(rollbackItems);
        }
    }, [items]);

    const stateMemo = useMemo(() => ({ items, showModal }), [items, showModal]);
    const actionMemo = useMemo(
        () => ({
        closeModal,
        loadItems,
        setShowModal,
        handleAddItem,
        handleDelete,
        handleTogglePurchased,
        handleReorder
        }),
        [closeModal, loadItems, handleAddItem, handleDelete, handleTogglePurchased, handleReorder]
    );

    return (
        <ListStateContext.Provider value={stateMemo}>
            <ListActionContext.Provider value={actionMemo}>
                {children}
            </ListActionContext.Provider>
        </ListStateContext.Provider>
    );
}

export function useListState() {
  const ctx = useContext(ListStateContext);
  if (!ctx) throw new Error('useListState must be used within <ListProvider>');
  return ctx;
}
    
export function useListActions() {
  const ctx = useContext(ListActionContext);
  if (!ctx) throw new Error('useListActions must be used within <ListProvider>');
  return ctx;
}
