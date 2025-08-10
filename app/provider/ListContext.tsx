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

        setItems(prevItems => [...prevItems, newItem]);
        await shoppingListApi.addItem(newItem);
        setShowModal(false);
    }, [items]);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        await shoppingListApi.deleteItem(id);
    }, []);

    const handleTogglePurchased = useCallback(async (id: string) => {
        const item = items.find(i => i.id === id);

        if (!item) return;

        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
        await shoppingListApi.togglePurchased(item);
    }, [items]);

    const handleReorder = useCallback(async (reorderedItems: ShoppingItemType[]) => {
        const itemsWithUpdatedOrder = reorderedItems.map((item, index) => ({
            ...item,
            order: index
        }));

        setItems(itemsWithUpdatedOrder);

        await shoppingListApi.reorderItems(itemsWithUpdatedOrder);
    }, []);

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
