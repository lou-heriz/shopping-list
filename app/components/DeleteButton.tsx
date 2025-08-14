import React from "react";
import Image from "next/image";

interface DeleteButtonProps {
    onDelete: () => void;
    buttonId: string;
}

const DeleteButton = ({ onDelete, buttonId }: DeleteButtonProps) => {
    return (
        <button
            id={buttonId}
            type="button"
            onClick={onDelete}
            className="p-1 rounded w-11 h-11"
            title={"Delete item"}
            aria-label={"Delete item"}
        >
            <Image
                src="/delete.svg"
                alt="Delete"
                width={33}
                height={33}
                className="mx-auto w-3/4"
            />
        </button>
    );
};

export default DeleteButton;