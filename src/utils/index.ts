import { Car, CarSpecsData, Participant } from "@/types/types";

export interface RankingItem extends Participant {
    techWins: number;
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

// Interface para definir como comparar campos técnicos sem usar any
interface TechField {
    label: string;
    get: (car: Car, stats: CarSpecsData) => number;
    better: 'high' | 'low';
}

const parseCons = (val: string | null | undefined): number => {
    if (!val) return 0;
    return parseFloat(val.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
};

export const formatPrice = (value: number) => Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)


// Função para calcular pontuação e ranking geral
export const calculateOverallRanking = ({ participants, cars }: {
    participants: Participant[];
    cars: Car[];
}): RankingItem[] => {
    const carsMap = new Map<string, Car>(cars.map(c => [c.id, c]));

    // 1. Definição ATUALIZADA para bater com o componente TechnicalComparison
    const techFields: TechField[] = [
        // Performance
        { label: "Potência", get: (_, stats) => stats.hp, better: 'high' },
        { label: "Torque", get: (_, stats) => stats.torque, better: 'high' },
        { label: "0-100", get: (_, stats) => stats.zeroToHundred, better: 'low' },
        { label: "Vel. Máxima", get: (car) => car.performance?.topSpeed || 0, better: 'high' },

        // Consumo
        { label: "Consumo Cidade G", get: (car) => parseCons(car.consumption?.cityGasoline), better: 'high' },
        { label: "Consumo Estrada G", get: (car) => parseCons(car.consumption?.highwayGasoline), better: 'high' },
        { label: "Consumo Cidade E", get: (car) => parseCons(car.consumption?.cityEthanol), better: 'high' },

        // Dimensões & Capacidade
        { label: "Porta-Malas", get: (car) => car.dimensions?.trunkCapacity || 0, better: 'high' },
        { label: "Tanque", get: (car) => car.capacity?.fuelTank || 0, better: 'high' },
        { label: "Peso", get: (car) => car.weight || 0, better: 'low' },
        { label: "Entre-eixos", get: (car) => car.dimensions?.wheelbase || 0, better: 'high' },

        // Mecânica
        { label: "Aro da Roda", get: (car) => car.tires?.wheelSize || 0, better: 'high' },
        { label: "Cilindros", get: (car) => car.engine?.cylinders || 0, better: 'high' },
    ];

    // 2. Preparação dos dados iniciais
    const results: RankingItem[] = participants.map(p => {
        const car = carsMap.get(p.id);
        if (!car) throw new Error(`Carro com ID ${p.id} não encontrado.`);

        const stats = car.specs[p.stage];
        const equipCount = Object.values(car.equipment)
            .flatMap(cat => Object.values(cat))
            .filter(Boolean).length;

        return {
            ...p,
            car,
            stats,
            equipCount,
            techWins: 0,
            totalScore: 0,
            pricePerHp: stats.hp ? car.price / stats.hp : 0
        };
    });

    // 3. Cálculo de Vitórias Técnicas (techWins)
    techFields.forEach(field => {
        const values = results.map(item => field.get(item.car, item.stats));
        const bestValue = field.better === 'high' ? Math.max(...values) : Math.min(...values);

        // Só conta vitória se o melhor valor não for zero
        if (bestValue !== 0) {
            results.forEach(item => {
                const currentVal = field.get(item.car, item.stats);
                if (currentVal === bestValue) {
                    item.techWins += 1;
                }
            });
        }
    });

    // 4. Cálculo do Score Final e Ordenação
    return results.map(item => {
        // Pesos: Performance (35%), Equipamentos (30%), Vitórias Técnicas (20%), Preço (15%)
        const scorePerf = Math.min((item.stats.hp / 400) * 35, 35);
        const scoreEquip = Math.min((item.equipCount / 50) * 30, 30);
        const scoreTech = Math.min((item.techWins / techFields.length) * 20, 20);
        const scorePrice = Math.max(0, (1 - (item.car.price / 350000)) * 15);

        return {
            ...item,
            totalScore: scorePerf + scoreEquip + scoreTech + scorePrice
        };
    }).sort((a, b) => b.totalScore - a.totalScore);
};