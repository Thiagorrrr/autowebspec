import { Car, CarSpecsData } from "@/components/Main/data";
import { Participant } from "@/types/types";

interface RankingItem extends Participant {
    car: Car;
    stats: CarSpecsData;
    equipCount: number;
    totalScore: number;
    pricePerHp: number;
}

export const getBestValue = (items: { val: number }[], key: string, isLowerBetter = false): number => {
    const values = items.map(i => i.val);
    if (isLowerBetter) return Math.min(...values);
    return Math.max(...values);
};

// Função para calcular pontuação e ranking geral
export const calculateOverallRanking = ({ participants, cars }: {
    participants: Participant[]
    cars: Car[]
}): RankingItem[] => {
    return participants.map(p => {
        const car = cars.find(c => c.id === p.id)!;
        const stats = car.specs[p.stage];
        const equipCount = Object.values(car.equipment).filter(Boolean).length;

        // Algoritmo de Pontuação Simplificado (0 a 100)
        // 1. Potência (peso 40%)
        // 2. Preço (peso 30% - menor é melhor)
        // 3. Equipamentos (peso 30%)

        // Normalização grosseira para o exemplo
        const scoreHp = stats.hp ? (stats.hp / 600) * 40 : 0
        const scorePrice = (1 - (car.price / 500000)) * 30;
        const scoreEquip = (equipCount / 10) * 30;

        const totalScore = scoreHp + scorePrice + scoreEquip;

        return {
            ...p,
            car,
            stats,
            equipCount,
            totalScore,
            pricePerHp: stats.hp ? car.price / stats.hp : 0
        };
    }).sort((a, b) => b.totalScore - a.totalScore); // Maior score primeiro
};