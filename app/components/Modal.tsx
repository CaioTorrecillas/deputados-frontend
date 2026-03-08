"use client";

type ModalProps = {
    open: boolean;
    title?: string;
    message: string;
    onClose: () => void;
    type?: "success" | "error" | "info";
};

export default function Modal({
    open,
    title,
    message,
    onClose,
    type = "info",
}: ModalProps) {
    if (!open) return null;

    const colors = {
        success: "text-green-600",
        error: "text-red-600",
        info: "text-blue-600",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                {title && (
                    <h2 className={`text-xl font-semibold ${colors[type]}`}>
                        {title}
                    </h2>
                )}

                <p className="text-gray-700">{message}</p>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
