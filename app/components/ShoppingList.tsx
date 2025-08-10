'use client';
import ShoppingItem from "./ShoppingItem";
import { useEffect, useMemo} from "react";
import AddItemButton from "./AddItemButton";
import Modal from "./Modal";
import AddItemForm from "./AddItemForm";
import { Reorder } from "motion/react"
import { useListActions, useListState } from "../provider/ListContext";

export default function ShoppingList() {
    const { items, showModal } = useListState()
    const { loadItems, setShowModal, handleReorder } = useListActions()
    const totalCost = useMemo(() => items.reduce((total, item) => total + item.price, 0).toFixed(2), [items])

    useEffect(() => {
        loadItems()
    }, [loadItems])  

    return (
        <>
            <h1 className="text-4xl font-bold pb-8 text-center">Shopping List</h1>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg items-center flex flex-col gap-2">
                <div className="flex justify-between items-center text-lg">
                    Total Cost: £{totalCost}
                </div>
            </div>
            <Reorder.Group aria-label="Shopping List" values={items} onReorder={handleReorder}>
                {items.map(item => (
                    <Reorder.Item key={item.id} value={item} className="flex items-center justify-between p-1 border-b last:border-b-0">
                        <ShoppingItem item={item}/>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <AddItemButton openModal={() => setShowModal(true)} />
            {showModal &&
                <Modal>
                    <AddItemForm />
                </Modal>
            }
        </>
    );
}