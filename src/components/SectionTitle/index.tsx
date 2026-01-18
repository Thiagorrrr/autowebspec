export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <h2 className={`text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2 ${className}`}>
        {children}
    </h2>
);