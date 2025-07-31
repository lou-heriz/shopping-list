import React from "react";

interface DeleteButtonProps {
    onDelete: () => void;
    buttonId: string;
}

const DeleteButton = ({ onDelete, buttonId }: DeleteButtonProps) => {
    return (
        <button
            id={buttonId}
            onClick={onDelete}
            className="p-1 rounded w-11 h-11"
            title={"Delete item"}
            aria-label={"Delete item"}
        >
            <img src="delete.svg" alt="Delete" className="mx-auto w-3/4" />
        </button>
    );
};

export default DeleteButton;