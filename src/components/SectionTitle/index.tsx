interface SectionTitleProps {
    children: React.ReactNode; // Título principal
    subtitle?: string;         // Opcional: Texto acima da linha roxa
    description?: string;      // Opcional: Texto explicativo abaixo
    className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    subtitle,
    description,
    className = ""
}) => {
    return (
        <div className={`py-8 lg:py-12 ${className}`}>

            {/* Renderiza a linha e o subtítulo apenas se o subtitle for fornecido */}
            {subtitle && (
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-0.5 w-8 bg-[#6319F7]"></div>
                    <span className="text-[#6319F7] text-xs lg:text-xs font-black uppercase tracking-widest">
                        {subtitle}
                    </span>
                </div>
            )}

            {/* Bloco de Texto Principal */}
            <div className="flex flex-col">
                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-[0.85]">
                    {children}
                </h2>

                {description && (
                    <p className="mt-4 max-w-md text-sm lg:text-base text-gray-500 font-medium leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};