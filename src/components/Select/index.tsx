export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select
        {...props}
        className="w-full bg-gray-50 text-xs font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    />
);