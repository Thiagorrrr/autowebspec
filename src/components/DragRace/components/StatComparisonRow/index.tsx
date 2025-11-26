import { Car, CarSpecsData } from "@/components/Main/data";
import { Participant } from "@/types/types";
import { getBestValue } from "@/utils";

interface StatComparisonRowProps {
  cars: Car[];
  label: string;
  participants: Participant[];
  dataKey: keyof CarSpecsData;
  unit: string;
  isLowerBetter?: boolean;
  icon: React.ElementType;
}

export const StatComparisonRow: React.FC<StatComparisonRowProps> = ({ cars, label, participants, dataKey, unit, isLowerBetter = false, icon: Icon }) => {
    const currentValues = participants.map(p => {
        const car = cars.find(c => c.id === p.id)!;
        return { id: p.id, val: car.specs[p.stage][dataKey] };
    });
    const bestVal = getBestValue(currentValues, 'val', isLowerBetter);
    const maxRef = isLowerBetter ? Math.max(...currentValues.map(v => v.val)) * 1.2 : bestVal * 1.2;

    return (
        <div className="bg-gray-50 p-3 rounded-lg mb-2 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-400 text-sm uppercase font-bold mb-2">
                {Icon && <Icon size={14} className="text-[#6319F7]" />}
                {label}
            </div>
            <div className="space-y-3">
                {participants.map((p) => {
                    const car = cars.find(c => c.id === p.id)!;
                    const val = car.specs[p.stage][dataKey];
                    const isBest = val === bestVal;
                    let barWidth = 0;
                    if (isLowerBetter) {
                        barWidth = ((maxRef - val) / maxRef) * 100;
                        if (barWidth < 10) barWidth = 10;
                    } else {
                        barWidth = (val / maxRef) * 100;
                    }
                    return (
                        <div key={p.tempId} className="flex items-center gap-3">
                            <div className="w-8 text-[10px] font-bold text-gray-400 uppercase truncate">{car.make}</div>
                            <div className="flex-1">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                                    <div className={`h-full transition-all duration-500 ${isBest ? 'bg-[#6319F7]' : 'bg-gray-400'}`} style={{ width: `${barWidth}%` }}/>
                                </div>
                            </div>
                            <div className={`w-16 text-right font-mono text-sm font-bold ${isBest ? 'text-[#6319F7]' : 'text-gray-600'}`}>
                                {val} <span className="text-[9px] text-gray-400">{unit}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};