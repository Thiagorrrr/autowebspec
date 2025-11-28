export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
        {children}
    </label>
);