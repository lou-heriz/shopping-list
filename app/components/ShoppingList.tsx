'use client';
import ShoppingItem from "./ShoppingItem";
import { ShoppingItemType } from "../types";

export default function ShoppingList() {

    const items: ShoppingItemType[] = [
        { id: "0", name: "Milk", price: 1 },
        { id: "1", name: "Eggs", price: 3 },
        { id: "2", name: "Self-Raising Flour", price: 1.5 },
        { id: "3", name: "Butter", price: 3 },
        { id: "4", name: "Sugar", price: 1 },
        { id: "5", name: "Blueberries", price: 2 },
        { id: "6", name: "Maple Syrup", price: 2 },
    ];

    return (
        <>
            <h1 className="text-4xl font-bold pb-8 text-center">Shopping List</h1>
            <ul aria-label="Shopping List">
                {items.map(item => (
                    <ShoppingItem key={item.id} item={item} />
                ))}
            </ul>
        </>
    );
}