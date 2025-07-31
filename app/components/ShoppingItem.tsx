'use client';
import { ShoppingItemType } from "../types";
import DeleteButton from "./DeleteButton";

interface ShoppingItemProps {
    item: ShoppingItemType;
    onDelete: (id: string) => void;
}

export default function ShoppingItem({ item, onDelete }: ShoppingItemProps) {
    return (
        <li className="flex items-center justify-between p-1 border-b last:border-b-0">
            <div className="flex items-center gap-3 w-full justify-between flex-1">
                <span className="font-semibold max-w-[calc(100%-4rem)] overflow-hidden text-ellipsis">{item.name}</span>
                <span className="font-medium">£{item.price.toFixed(2)}</span>
            </div>
            <DeleteButton buttonId={`delete-button-${item.id}`} onDelete={() => onDelete(item.id)} />
        </li>
    );
}
