'use client';
import { ShoppingItemType } from "../types";

export default function ShoppingItem({ item }: { item: ShoppingItemType }) {
    return (
        <li className="flex items-center justify-between p-1 border-b last:border-b-0">
            <div className="flex items-center gap-3 w-full justify-between flex-1">
                <span className="font-semibold">{item.name}</span>
                <span className="font-medium">£{item.price.toFixed(2)}</span>
            </div>
        </li>
    );
}
