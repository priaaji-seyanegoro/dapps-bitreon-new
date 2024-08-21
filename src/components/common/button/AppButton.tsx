import React, { useRef } from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
    className?: string;
}

const AppButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = "button",
    icon,
    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center px-6 py-3 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all transform active:scale-95 ${className}`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
};

export default AppButton;