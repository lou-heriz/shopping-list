'use client';
import { ShoppingItemType } from "../types";
import DeleteButton from "./DeleteButton";

interface ShoppingItemProps {
    item: ShoppingItemType;
    onDelete: (id: string) => void;
    onTogglePurchased: (id: string) => void;
}

export default function ShoppingItem({ item, onDelete, onTogglePurchased }: ShoppingItemProps) {
    return (
        <>
            <div className="flex items-center gap-3 w-full justify-between flex-1">
                <label
                    htmlFor={`purchased-checkbox-${item.name}`}
                    className="flex items-center justify-center w-11 h-11 cursor-pointer"
                    title="Mark as purchased"
                >
                    <input
                        id={`purchased-checkbox-${item.name}`}
                        name="purchased"
                        type="checkbox"
                        checked={item.purchased}
                        onChange={() => onTogglePurchased(item.id)}
                        className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="sr-only">Mark item as purchased</span>
                </label>
                <span className={`flex items-center justify-between flex-1 ${item.purchased ? 'line-through text-gray-500' : ''}`}>
                    <span className="font-semibold">{item.name}</span>
                    <span data-testid="item-price" className="font-medium">£{item.price.toFixed(2)}</span>
                </span>
            </div>
            <DeleteButton buttonId={`delete-button-${item.id}`} onDelete={() => onDelete(item.id)} />
        </>
    );
}
