"use client"
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
    <div onClick={onClick} className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative transition-shadow duration-300 ${onClick ? 'hover:shadow-md cursor-pointer' : ''} ${className}`}>
        {children}
    </div>
);