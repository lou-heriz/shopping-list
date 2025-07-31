'use client';

export default function AddItemButton({ openModal }: { openModal: () => void }) {
    return (
        <>
            <button
                onClick={openModal}
                className="bg-blue-500 text-white py-2 rounded w-full h-11"
            >
                + Add Item
            </button>
        </>
    );
}
