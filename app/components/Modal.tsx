import { useListActions } from "../provider/ListContext";

export default function Modal({ children }: { children: React.ReactNode }) {
    const { closeModal } = useListActions();
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={closeModal}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="bg-white rounded shadow-lg p-6 w-80% mx-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
