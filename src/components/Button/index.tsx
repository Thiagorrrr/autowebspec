"use client"
export const Button: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    primary?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
}> = ({ children, onClick, primary, fullWidth, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
      flex items-center justify-center gap-2 rounded-xl font-bold cursor-pointer transition-all active:scale-95
      ${fullWidth ? 'w-full' : ''}
      ${primary
                ? 'bg-[#6319F7] text-white py-3 md:py-4 text-sm uppercase tracking-widest shadow-lg hover:bg-[#5014c9] disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-[#6319F7]/10 text-[#6319F7] py-2 px-3 text-xs hover:bg-[#6319F7] hover:text-white border border-transparent'
            }
      ${className}
    `}
    >
        {children}
    </button>
);