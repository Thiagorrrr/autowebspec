

interface CarEquipment {
    [key: string]: boolean;
}

export interface CarSpecsData {
    hp: number;
    torque: number;
    zeroToHundred: number;
}

interface CarSpecs {
    stock: CarSpecsData;
    stage1: CarSpecsData;
    stage2: CarSpecsData;
    stage3: CarSpecsData;
}

export interface Car {
    id: string;
    make: string;
    model: string;
    version: string;
    name?: string; // Adicionado após o map
    year: number;
    category: string;
    price: number;
    fipe: string;
    weight: number;
    specs: CarSpecs;
    equipment: CarEquipment;
    chronic: string[];
    image: string;
    photos: string[];
}

export const dataCars = (): Car[] => [
    {
        "id": "chevrolet-onix-2025",
        "make": "Chevrolet",
        "model": "Onix",
        "version": "1.0 Turbo AT",
        "year": 2025,
        "category": "Hatch Compacto",
        "price": 100612,
        "fipe": "R$ 100.612",
        "weight": 1085,
        "specs": {
            "stock": { "hp": 116, "torque": 16.8, "zeroToHundred": 10.1 },
            "stage1": { "hp": 130, "torque": 19.0, "zeroToHundred": 9.4 },
            "stage2": { "hp": 145, "torque": 21.5, "zeroToHundred": 8.6 },
            "stage3": { "hp": 165, "torque": 25.0, "zeroToHundred": 7.9 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Tela multimídia travando", "Barulho interno"],
        "image": "chevrolet-onix-2025.webp",
        "photos": [
            "chevrolet-onix-2025.webp"
        ]
    },
    {
        "id": "hyundai-hb20-2025",
        "make": "Hyundai",
        "model": "HB20",
        "version": "1.0 TGDI AT Platinum Safety",
        "year": 2025,
        "category": "Hatch Compacto",
        "price": 115000,
        "fipe": "R$ 113.800",
        "weight": 1111,
        "specs": {
            "stock": { "hp": 120, "torque": 17.5, "zeroToHundred": 10.7 },
            "stage1": { "hp": 140, "torque": 20.0, "zeroToHundred": 9.5 },
            "stage2": { "hp": 155, "torque": 22.5, "zeroToHundred": 8.8 },
            "stage3": { "hp": 175, "torque": 26.0, "zeroToHundred": 8.1 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Desvalorização acima da média", "Acabamento interno simples", "Ruído na suspensão dianteira"],
        "image": "hyundai-hb20-2025.webp",
        "photos": [
            "hyundai-hb20-2025.webp"
        ]
    },
    {
        "id": "peugeot-208-2025",
        "make": "Peugeot",
        "model": "208",
        "version": "1.0 Turbo CVT GT",
        "year": 2025,
        "category": "Hatch Compacto",
        "price": 119990,
        "fipe": "R$ 118.500",
        "weight": 1157,
        "specs": {
            "stock": { "hp": 130, "torque": 20.4, "zeroToHundred": 9.0 },
            "stage1": { "hp": 150, "torque": 23.0, "zeroToHundred": 8.1 },
            "stage2": { "hp": 165, "torque": 25.5, "zeroToHundred": 7.4 },
            "stage3": { "hp": 185, "torque": 28.0, "zeroToHundred": 6.8 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Rede de concessionárias menor", "Teto panorâmico não abre", "Desvalorização ligeiramente maior"],
        "image": "peugeot-208-2025.webp",
        "photos": [
            "peugeot-208-2025.webp"
        ]
    },
    {
        "id": "volkswagen-polo-2025",
        "make": "Volkswagen",
        "model": "Polo",
        "version": "1.0 TSI AT Comfortline",
        "year": 2025,
        "category": "Hatch Compacto",
        "price": 105990,
        "fipe": "R$ 104.500",
        "weight": 1140,
        "specs": {
            "stock": { "hp": 116, "torque": 16.8, "zeroToHundred": 10.2 },
            "stage1": { "hp": 135, "torque": 19.5, "zeroToHundred": 9.0 },
            "stage2": { "hp": 150, "torque": 22.0, "zeroToHundred": 8.3 },
            "stage3": { "hp": 170, "torque": 25.0, "zeroToHundred": 7.5 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Acabamento interno simplificado (pós-facelift)", "Menos airbags de série (4)", "Suspensão rígida para uso urbano"],
        "image": "volkswagen-polo-2025.webp",
        "photos": [
            "volkswagen-polo-2025.webp"
        ]
    },
    {
        "id": "fiat-argo-2025",
        "make": "Fiat",
        "model": "Argo",
        "version": "1.3 Firefly AT",
        "year": 2025,
        "category": "Hatch Compacto",
        "price": 95000,
        "fipe": "R$ 93.500",
        "weight": 1140,
        "specs": {
            "stock": { "hp": 107, "torque": 13.7, "zeroToHundred": 11.2 },
            "stage1": { "hp": 115, "torque": 15.0, "zeroToHundred": 10.5 },
            "stage2": { "hp": 125, "torque": 16.5, "zeroToHundred": 9.8 },
            "stage3": { "hp": 140, "torque": 18.0, "zeroToHundred": 9.2 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Acabamento interno simples", "Apenas 2 airbags de série", "Desempenho limitado (em relação aos 1.0 turbo)"],
        "image": "fiat-argo-2025.webp",
        "photos": [
            "fiat-argo-2025.webp"
        ]
    },
    {
        "id": "citroen-c3-2025",
        "make": "Citroën",
        "model": "C3",
        "version": "1.6 AT Feel Pack",
        "year": 2025,
        "category": "Hatch Compacto",
        "price": 93990,
        "fipe": "R$ 91.800",
        "weight": 1058,
        "specs": {
            "stock": { "hp": 113, "torque": 15.7, "zeroToHundred": 10.4 },
            "stage1": { "hp": 120, "torque": 16.5, "zeroToHundred": 9.8 },
            "stage2": { "hp": 130, "torque": 18.0, "zeroToHundred": 9.0 },
            "stage3": { "hp": 145, "torque": 20.0, "zeroToHundred": 8.2 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Apenas 2 airbags de série (segurança básica)", "Câmbio automático de 6 marchas antiquado", "Acabamento interno muito simples", "Manutenção da revenda ainda incerta"],
        "image": "citroen-c3-2025.webp",
        "photos": [
            "citroen-c3-2025.webp"
        ]
    },
    {
        "id": "fiat-mobi-2025",
        "make": "Fiat",
        "model": "Mobi",
        "version": "1.0 Firefly Manual Trekking",
        "year": 2025,
        "category": "Subcompacto",
        "price": 82990,
        "fipe": "R$ 81.500",
        "weight": 969,
        "specs": {
            "stock": { "hp": 75, "torque": 10.7, "zeroToHundred": 13.8 },
            "stage1": { "hp": 82, "torque": 11.5, "zeroToHundred": 13.0 },
            "stage2": { "hp": 90, "torque": 12.5, "zeroToHundred": 12.0 },
            "stage3": { "hp": 100, "torque": 14.0, "zeroToHundred": 11.0 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Apenas 2 airbags (sem laterais)", "Porta-malas minúsculo (200L)", "Motor ruidoso em alta rotação", "Ausência de câmbio automático"],
        "image": "fiat-mobi-2025.webp",
        "photos": [
            "fiat-mobi-2025.webp"
        ]
    },
    {
        "id": "renault-kwid-2025",
        "make": "Renault",
        "model": "Kwid",
        "version": "1.0 Manual Outsider",
        "year": 2025,
        "category": "Subcompacto",
        "price": 86990,
        "fipe": "R$ 85.000",
        "weight": 818,
        "specs": {
            "stock": { "hp": 71, "torque": 10.0, "zeroToHundred": 13.2 },
            "stage1": { "hp": 78, "torque": 10.8, "zeroToHundred": 12.5 },
            "stage2": { "hp": 85, "torque": 11.8, "zeroToHundred": 11.7 },
            "stage3": { "hp": 95, "torque": 13.0, "zeroToHundred": 10.8 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Motor 1.0 fraco em subidas", "Baixa qualidade do acabamento interno", "Posição de dirigir elevada", "Baixo isolamento acústico"],
        "image": "renault-kwid-2025.webp",
        "photos": [
            "renault-kwid-2025.webp"
        ]
    },
    {
        "id": "byd-dolphin-mini-2025",
        "make": "BYD",
        "model": "Dolphin Mini",
        "version": "EV GS 38 kWh",
        "year": 2025,
        "category": "Hatch Elétrico Compacto",
        "price": 118990,
        "fipe": "R$ 118.990",
        "weight": 1239,
        "specs": {
            "stock": { "hp": 75, "torque": 13.8, "zeroToHundred": 14.9 },
            "stage1": { "hp": 85, "torque": 15.0, "zeroToHundred": 14.0 },
            "stage2": { "hp": 95, "torque": 16.5, "zeroToHundred": 13.0 },
            "stage3": { "hp": 105, "torque": 18.0, "zeroToHundred": 12.0 },
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": false
        },
        "chronic": ["Baixa potência em estrada", "Porta-malas pequeno (230L)", "Tempo de recarga em AC (6,6kW)", "Apenas 4 lugares"],
        "image": "byd-dolphin-mini-2025.webp",
        "photos": [
            "byd-dolphin-mini-2025.webp"
        ]
    },
    {
        "id": "byd-dolphin-2025",
        "make": "BYD",
        "model": "Dolphin",
        "version": "EV GS 44.9 kWh",
        "year": 2025,
        "category": "Hatch Elétrico Compacto",
        "price": 149800,
        "fipe": "R$ 148.900",
        "weight": 1405,
        "specs": {
            "stock": { "hp": 95, "torque": 18.3, "zeroToHundred": 10.9 },
            "stage1": { "hp": 105, "torque": 20.0, "zeroToHundred": 10.0 },
            "stage2": { "hp": 115, "torque": 22.0, "zeroToHundred": 9.2 },
            "stage3": { "hp": 130, "torque": 24.0, "zeroToHundred": 8.5 },
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Central multimídia rotativa pode ser distrativa", "Ausência de ajuste de profundidade do volante", "Acabamento em plástico rígido"],
        "image": "byd-dolphin-2025.webp",
        "photos": [
            "byd-dolphin-2025.webp"
        ]
    },
    {
        "id": "honda-city-hatch-2025",
        "make": "Honda",
        "model": "City Hatch",
        "version": "1.5 CVT Touring",
        "year": 2025,
        "category": "Hatch Compacto Premium",
        "price": 142000,
        "fipe": "R$ 138.900",
        "weight": 1150,
        "specs": {
            "stock": { "hp": 126, "torque": 15.5, "zeroToHundred": 10.8 },
            "stage1": { "hp": 135, "torque": 16.5, "zeroToHundred": 10.2 },
            "stage2": { "hp": 145, "torque": 18.0, "zeroToHundred": 9.5 },
            "stage3": { "hp": 160, "torque": 20.0, "zeroToHundred": 8.8 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Motor aspirado tem desempenho inferior aos turbos", "Preço de aquisição elevado", "Central multimídia poderia ser mais rápida"],
        "image": "honda-city-hatch-2025.webp",
        "photos": [
            "honda-city-hatch-2025.webp"
        ]
    },
    {
        "id": "toyota-corolla-sedan-2025",
        "make": "Toyota",
        "model": "Corolla",
        "version": "2.0 CVT XEi",
        "year": 2025,
        "category": "Sedã Médio",
        "price": 160000,
        "fipe": "R$ 158.800",
        "weight": 1405,
        "specs": {
            "stock": { "hp": 175, "torque": 21.3, "zeroToHundred": 9.2 },
            "stage1": { "hp": 185, "torque": 22.5, "zeroToHundred": 8.5 },
            "stage2": { "hp": 200, "torque": 24.0, "zeroToHundred": 7.8 },
            "stage3": { "hp": 220, "torque": 26.0, "zeroToHundred": 7.0 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Câmbio CVT (simulado) pode ser ruidoso em alta rotação", "Preço de seguro acima da média", "Acabamento interno conservador (em relação a concorrentes)"],
        "image": "toyota-corolla-sedan-2025.webp",
        "photos": [
            "toyota-corolla-sedan-2025.webp"
        ]
    },
    {
        "id": "byd-king-2025",
        "make": "BYD",
        "model": "King",
        "version": "1.5 Híbrido Plug-in GS",
        "year": 2025,
        "category": "Sedã Médio Híbrido (PHEV)",
        "price": 175800,
        "fipe": "R$ 174.500",
        "weight": 1475,
        "specs": {
            "stock": { "hp": 235, "torque": 33.1, "zeroToHundred": 7.3 },
            "stage1": { "hp": 250, "torque": 35.0, "zeroToHundred": 6.8 },
            "stage2": { "hp": 265, "torque": 37.0, "zeroToHundred": 6.3 },
            "stage3": { "hp": 280, "torque": 39.0, "zeroToHundred": 5.8 },
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": false
        },
        "chronic": ["Ausência de itens ADAS (ACC, alerta de faixa)", "Potencial de desvalorização (marca nova)", "Consumo real depende do hábito de recarga (PHEV)"],
        "image": "byd-king-2025.webp",
        "photos": [
            "byd-king-2025.webp"
        ]
    },
    {
        "id": "nissan-sentra-2025",
        "make": "Nissan",
        "model": "Sentra",
        "version": "2.0 CVT Exclusive",
        "year": 2025,
        "category": "Sedã Médio",
        "price": 188490,
        "fipe": "R$ 185.000",
        "weight": 1410,
        "specs": {
            "stock": { "hp": 151, "torque": 20.0, "zeroToHundred": 9.4 },
            "stage1": { "hp": 160, "torque": 21.5, "zeroToHundred": 8.8 },
            "stage2": { "hp": 170, "torque": 23.0, "zeroToHundred": 8.1 },
            "stage3": { "hp": 185, "torque": 25.0, "zeroToHundred": 7.4 }
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": true
        },
        "chronic": ["Motor 2.0 aspirado a gasolina (não é flex)", "Freio de estacionamento acionado por pedal", "Câmbio CVT sem opção manual para todas as versões"],
        "image": "nissan-sentra-2025.webp",
        "photos": [
            "nissan-sentra-2025.webp"
        ]
    },
    {
        "id": "chevrolet-onix-plus-2025",
        "make": "Chevrolet",
        "model": "Onix Plus",
        "version": "1.0 Turbo AT",
        "year": 2025,
        "category": "Sedã Compacto",
        "price": 105612,
        "fipe": "R$ 103.900",
        "weight": 1109,
        "specs": {
            "stock": { "hp": 116, "torque": 16.8, "zeroToHundred": 10.4 },
            "stage1": { "hp": 130, "torque": 19.0, "zeroToHundred": 9.4 },
            "stage2": { "hp": 145, "torque": 21.5, "zeroToHundred": 8.6 },
            "stage3": { "hp": 165, "torque": 25.0, "zeroToHundred": 7.9 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Tela multimídia travando", "Barulho interno (acabamento simples)", "Espaço do banco traseiro apertado para 3 adultos"],
        "image": "chevrolet-onix-plus-2025.webp",
        "photos": [
            "chevrolet-onix-plus-2025.webp"
        ]
    },
    {
        "id": "volkswagen-virtus-2025",
        "make": "Volkswagen",
        "model": "Virtus",
        "version": "1.0 TSI AT Comfortline",
        "year": 2025,
        "category": "Sedã Compacto",
        "price": 134990,
        "fipe": "R$ 133.737",
        "weight": 1202,
        "specs": {
            "stock": { "hp": 128, "torque": 20.4, "zeroToHundred": 10.0 },
            "stage1": { "hp": 145, "torque": 23.0, "zeroToHundred": 9.0 },
            "stage2": { "hp": 165, "torque": 25.5, "zeroToHundred": 8.3 },
            "stage3": { "hp": 185, "torque": 28.0, "zeroToHundred": 7.5 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Acabamento interno com muito plástico rígido", "Ausência de disco de freio traseiro", "Câmbio automático de 6 marchas mais lento que o DSG (em modelos antigos)"],
        "image": "volkswagen-virtus-2025.webp",
        "photos": [
            "volkswagen-virtus-2025.webp"
        ]
    },
    {
        "id": "hyundai-hb20s-2025",
        "make": "Hyundai",
        "model": "HB20S",
        "version": "1.0 TGDI AT Platinum Plus",
        "year": 2025,
        "category": "Sedã Compacto",
        "price": 128990,
        "fipe": "R$ 127.500",
        "weight": 1140,
        "specs": {
            "stock": { "hp": 120, "torque": 17.5, "zeroToHundred": 10.7 },
            "stage1": { "hp": 140, "torque": 20.0, "zeroToHundred": 9.5 },
            "stage2": { "hp": 155, "torque": 22.5, "zeroToHundred": 8.8 },
            "stage3": { "hp": 175, "torque": 26.0, "zeroToHundred": 8.1 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Acabamento em plástico rígido (como concorrentes)", "Design traseiro controverso (em relação a gerações anteriores)", "Apenas 6 airbags (Onix Plus e Virtus também oferecem)"],
        "image": "hyundai-hb20s-2025.webp",
        "photos": [
            "hyundai-hb20s-2025.webp"
        ]
    },
    {
        "id": "fiat-cronos-2025",
        "make": "Fiat",
        "model": "Cronos",
        "version": "1.3 Firefly AT Drive",
        "year": 2025,
        "category": "Sedã Compacto",
        "price": 101990,
        "fipe": "R$ 100.500",
        "weight": 1131,
        "specs": {
            "stock": { "hp": 107, "torque": 13.7, "zeroToHundred": 11.2 },
            "stage1": { "hp": 115, "torque": 15.0, "zeroToHundred": 10.5 },
            "stage2": { "hp": 125, "torque": 16.5, "zeroToHundred": 9.8 },
            "stage3": { "hp": 140, "torque": 18.0, "zeroToHundred": 9.2 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Apenas 2 airbags de série (segurança básica)", "Motor 1.3 Firefly aspirado é fraco perto dos turbos", "Acabamento interno simples", "Baixa liquidez no mercado de usados"],
        "image": "fiat-cronos-2025.webp",
        "photos": [
            "fiat-cronos-2025.webp"
        ]
    },
    {
        "id": "volkswagen-tcross-2025",
        "make": "Volkswagen",
        "model": "T-Cross",
        "version": "1.0 TSI AT Comfortline",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 160990,
        "fipe": "R$ 158.500",
        "weight": 1258,
        "specs": {
            "stock": { "hp": 128, "torque": 20.4, "zeroToHundred": 10.4 },
            "stage1": { "hp": 145, "torque": 23.0, "zeroToHundred": 9.5 },
            "stage2": { "hp": 165, "torque": 25.5, "zeroToHundred": 8.8 },
            "stage3": { "hp": 185, "torque": 28.0, "zeroToHundred": 8.1 }
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Acabamento interno com plástico rígido (padrão da categoria)", "Porta-malas menor que o do Nivus e Virtus (373L)", "Revisões mais caras que as dos concorrentes japoneses/coreanos"],
        "image": "volkswagen-tcross-2025.webp",
        "photos": [
            "volkswagen-tcross-2025.webp"
        ]
    },
    {
        "id": "hyundai-creta-2025",
        "make": "Hyundai",
        "model": "Creta",
        "version": "1.0 TGDI AT Limited",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 146990,
        "fipe": "R$ 145.500",
        "weight": 1275,
        "specs": {
            "stock": { "hp": 120, "torque": 17.5, "zeroToHundred": 11.5 },
            "stage1": { "hp": 140, "torque": 20.0, "zeroToHundred": 10.5 },
            "stage2": { "hp": 155, "torque": 22.5, "zeroToHundred": 9.8 },
            "stage3": { "hp": 175, "torque": 26.0, "zeroToHundred": 9.1 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Design polarizador (muito amado ou odiado)", "Versões mais baratas têm apenas 2 airbags", "Ausência de ACC (apenas nas versões mais caras)"],
        "image": "hyundai-creta-2025.webp",
        "photos": [
            "hyundai-creta-2025.webp"
        ]
    },
    {
        "id": "toyota-corolla-cross-2025",
        "make": "Toyota",
        "model": "Corolla Cross",
        "version": "2.0 Flex CVT XRE",
        "year": 2025,
        "category": "SUV Médio",
        "price": 190000,
        "fipe": "R$ 187.900",
        "weight": 1420,
        "specs": {
            "stock": { "hp": 175, "torque": 21.3, "zeroToHundred": 9.8 },
            "stage1": { "hp": 185, "torque": 22.5, "zeroToHundred": 9.1 },
            "stage2": { "hp": 200, "torque": 24.0, "zeroToHundred": 8.4 },
            "stage3": { "hp": 220, "torque": 26.0, "zeroToHundred": 7.6 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Freio de estacionamento acionado por pedal", "Ausência de teto solar (versão XRE)", "Design da traseira (silencioso e lanternas)"],
        "image": "toyota-corolla-cross-2025.webp",
        "photos": [
            "toyota-corolla-cross-2025.webp"
        ]
    },
    {
        "id": "honda-hrv-2025",
        "make": "Honda",
        "model": "HR-V",
        "version": "1.5 CVT EXL Sensing",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 167800,
        "fipe": "R$ 165.500",
        "weight": 1286,
        "specs": {
            "stock": { "hp": 126, "torque": 15.5, "zeroToHundred": 11.2 },
            "stage1": { "hp": 135, "torque": 16.5, "zeroToHundred": 10.5 },
            "stage2": { "hp": 145, "torque": 18.0, "zeroToHundred": 9.8 },
            "stage3": { "hp": 160, "torque": 20.0, "zeroToHundred": 9.0 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Motor 1.5 aspirado é fraco (comparado aos turbos)", "Preço elevado para versão aspirada", "Acabamento interno com muito plástico rígido"],
        "image": "honda-hrv-2025.webp",
        "photos": [
            "honda-hrv-2025.webp"
        ]
    },
    {
        "id": "chevrolet-tracker-2025",
        "make": "Chevrolet",
        "model": "Tracker",
        "version": "1.2 Turbo AT Premier",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 170920,
        "fipe": "R$ 168.500",
        "weight": 1271,
        "specs": {
            "stock": { "hp": 133, "torque": 21.4, "zeroToHundred": 9.4 },
            "stage1": { "hp": 150, "torque": 24.0, "zeroToHundred": 8.5 },
            "stage2": { "hp": 165, "torque": 26.5, "zeroToHundred": 7.8 },
            "stage3": { "hp": 180, "torque": 29.0, "zeroToHundred": 7.1 }
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Apenas 6 airbags (menos que alguns concorrentes)", "Ausência de ACC (presente em T-Cross/Creta topo de linha)", "Motor 1.2 turbo pode ter consumo elevado com pé pesado"],
        "image": "chevrolet-tracker-2025.webp",
        "photos": [
            "chevrolet-tracker-2025.webp"
        ]
    },
    {
        "id": "jeep-compass-2025",
        "make": "Jeep",
        "model": "Compass",
        "version": "1.3 T270 AT Limited",
        "year": 2025,
        "category": "SUV Médio",
        "price": 209990,
        "fipe": "R$ 207.500",
        "weight": 1500,
        "specs": {
            "stock": { "hp": 185, "torque": 27.5, "zeroToHundred": 8.8 },
            "stage1": { "hp": 200, "torque": 30.0, "zeroToHundred": 8.1 },
            "stage2": { "hp": 220, "torque": 33.0, "zeroToHundred": 7.4 },
            "stage3": { "hp": 240, "torque": 36.0, "zeroToHundred": 6.8 }
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": true
        },
        "chronic": ["Consumo elevado (motor T270 Flex na cidade)", "Preço de manutenção e seguro altos", "Suspensão mais firme (menos confortável que a de alguns rivais)"],
        "image": "jeep-compass-2025.webp",
        "photos": [
            "jeep-compass-2025.webp"
        ]
    },
    {
        "id": "fiat-fastback-2025",
        "make": "Fiat",
        "model": "Fastback",
        "version": "1.3 Turbo AT Limited Edition",
        "year": 2025,
        "category": "SUV Cupê Compacto",
        "price": 164990,
        "fipe": "R$ 163.500",
        "weight": 1304,
        "specs": {
            "stock": { "hp": 185, "torque": 27.5, "zeroToHundred": 8.1 },
            "stage1": { "hp": 200, "torque": 30.0, "zeroToHundred": 7.4 },
            "stage2": { "hp": 220, "torque": 33.0, "zeroToHundred": 6.8 },
            "stage3": { "hp": 240, "torque": 36.0, "zeroToHundred": 6.2 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Acabamento interno com muito plástico rígido", "Espaço no banco traseiro limitado (design cupê)", "Apenas 4 airbags (em todas as versões)"],
        "image": "fiat-fastback-2025.webp",
        "photos": [
            "fiat-fastback-2025.webp"
        ]
    },
    {
        "id": "nissan-kicks-2025",
        "make": "Nissan",
        "model": "Kicks",
        "version": "1.6 CVT Exclusive",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 149490,
        "fipe": "R$ 147.000",
        "weight": 1139,
        "specs": {
            "stock": { "hp": 113, "torque": 15.3, "zeroToHundred": 11.8 },
            "stage1": { "hp": 120, "torque": 16.5, "zeroToHundred": 11.0 },
            "stage2": { "hp": 130, "torque": 18.0, "zeroToHundred": 10.2 },
            "stage3": { "hp": 145, "torque": 20.0, "zeroToHundred": 9.5 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Motor 1.6 aspirado é fraco em ultrapassagens", "Acabamento interno simples (comparado ao preço)", "Câmbio CVT ruidoso em acelerações fortes"],
        "image": "nissan-kicks-2025.webp",
        "photos": [
            "nissan-kicks-2025.webp"
        ]
    },
    {
        "id": "volkswagen-nivus-2025",
        "make": "Volkswagen",
        "model": "Nivus",
        "version": "1.0 TSI AT Highline",
        "year": 2025,
        "category": "SUV Cupê Compacto",
        "price": 149990,
        "fipe": "R$ 148.500",
        "weight": 1199,
        "specs": {
            "stock": { "hp": 128, "torque": 20.4, "zeroToHundred": 10.5 },
            "stage1": { "hp": 145, "torque": 23.0, "zeroToHundred": 9.5 },
            "stage2": { "hp": 165, "torque": 25.5, "zeroToHundred": 8.8 },
            "stage3": { "hp": 185, "torque": 28.0, "zeroToHundred": 8.1 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Apenas 6 airbags (menos que alguns rivais)", "Acabamento interno com muito plástico rígido", "Espaço traseiro limitado (design cupê)"],
        "image": "volkswagen-nivus-2025.webp",
        "photos": [
            "volkswagen-nivus-2025.webp"
        ]
    },
    {
        "id": "fiat-pulse-2025",
        "make": "Fiat",
        "model": "Pulse",
        "version": "1.3 Turbo AT Abarth",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 156990,
        "fipe": "R$ 155.000",
        "weight": 1281,
        "specs": {
            "stock": { "hp": 185, "torque": 27.5, "zeroToHundred": 7.6 },
            "stage1": { "hp": 200, "torque": 30.0, "zeroToHundred": 7.0 },
            "stage2": { "hp": 220, "torque": 33.0, "zeroToHundred": 6.4 },
            "stage3": { "hp": 240, "torque": 36.0, "zeroToHundred": 5.8 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Apenas 4 airbags (em todas as versões)", "Acabamento interno com muito plástico rígido", "Espaço interno limitado para 5 adultos"],
        "image": "fiat-pulse-2025.webp",
        "photos": [
            "fiat-pulse-2025.webp"
        ]
    },
    {
        "id": "peugeot-2008-turbo-2025",
        "make": "Peugeot",
        "model": "2008",
        "version": "1.0 Turbo 200 CVT Griffe",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 140000,
        "fipe": "R$ 138.500",
        "weight": 1220,
        "specs": {
            "stock": { "hp": 130, "torque": 20.4, "zeroToHundred": 9.7 },
            "stage1": { "hp": 145, "torque": 23.0, "zeroToHundred": 8.9 },
            "stage2": { "hp": 160, "torque": 25.0, "zeroToHundred": 8.2 },
            "stage3": { "hp": 180, "torque": 28.0, "zeroToHundred": 7.5 }
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": false,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Apenas 4 airbags (segurança inferior a T-Cross/Creta)", "Design da geração anterior (em relação à Europa)", "Ausência de ACC (mesmo nas versões topo de linha)"],
        "image": "peugeot-2008-turbo-2025.webp",
        "photos": [
            "peugeot-2008-turbo-2025.webp"
        ]
    },
    {
        "id": "jeep-renegade-2025",
        "make": "Jeep",
        "model": "Renegade",
        "version": "1.3 T270 AT Série S",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 187990,
        "fipe": "R$ 185.000",
        "weight": 1468,
        "specs": {
            "stock": { "hp": 185, "torque": 27.5, "zeroToHundred": 8.7 },
            "stage1": { "hp": 200, "torque": 30.0, "zeroToHundred": 8.1 },
            "stage2": { "hp": 220, "torque": 33.0, "zeroToHundred": 7.4 },
            "stage3": { "hp": 240, "torque": 36.0, "zeroToHundred": 6.8 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": true,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Porta-malas pequeno (320L)", "Consumo de combustível elevado (devido ao peso e 4x4)", "Espaço interno apertado no banco traseiro"],
        "image": "jeep-renegade-2025.webp",
        "photos": [
            "jeep-renegade-2025.webp"
        ]
    },
    {
        "id": "renault-kardian-2025",
        "make": "Renault",
        "model": "Kardian",
        "version": "1.0 TCe Turbo EDC Premiere Edition",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 133000,
        "fipe": "R$ 131.500",
        "weight": 1221,
        "specs": {
            "stock": { "hp": 125, "torque": 22.4, "zeroToHundred": 9.9 },
            "stage1": { "hp": 140, "torque": 25.0, "zeroToHundred": 9.2 },
            "stage2": { "hp": 155, "torque": 28.0, "zeroToHundred": 8.5 },
            "stage3": { "hp": 170, "torque": 31.0, "zeroToHundred": 7.8 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true
        },
        "chronic": ["Rede de concessionárias menor que VW/GM", "Confiabilidade do novo motor TCe 1.0 e câmbio EDC (a ser comprovada)", "Preço de topo de linha alto para a marca"],
        "image": "renault-kardian-2025.webp",
        "photos": [
            "renault-kardian-2025.webp"
        ]
    },
    {
        "id": "caoa-chery-tiggo-7-2025",
        "make": "Caoa Chery",
        "model": "Tiggo 7",
        "version": "1.6 TGDI AT Pro Max Drive",
        "year": 2025,
        "category": "SUV Médio",
        "price": 179990,
        "fipe": "R$ 178.500",
        "weight": 1550,
        "specs": {
            "stock": { "hp": 187, "torque": 28.0, "zeroToHundred": 8.1 },
            "stage1": { "hp": 205, "torque": 31.0, "zeroToHundred": 7.5 },
            "stage2": { "hp": 225, "torque": 34.0, "zeroToHundred": 6.9 },
            "stage3": { "hp": 245, "torque": 37.0, "zeroToHundred": 6.3 }
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": true
        },
        "chronic": ["Desvalorização e liquidez de revenda", "Rede de concessionárias limitada", "Consumo de combustível elevado em uso urbano"],
        "image": "caoa-chery-tiggo-7-2025.webp",
        "photos": [
            "caoa-chery-tiggo-7-2025.webp"
        ]
    },
    {
        "id": "gwm-haval-h6-2025",
        "make": "GWM",
        "model": "Haval H6",
        "version": "1.5 Turbo HEV AT",
        "year": 2025,
        "category": "SUV Médio Híbrido",
        "price": 214000,
        "fipe": "R$ 212.900",
        "weight": 1715,
        "specs": {
            "stock": { "hp": 243, "torque": 54.0, "zeroToHundred": 7.9 },
            "stage1": { "hp": 260, "torque": 56.0, "zeroToHundred": 7.5 },
            "stage2": { "hp": 280, "torque": 59.0, "zeroToHundred": 7.0 },
            "stage3": { "hp": 300, "torque": 62.0, "zeroToHundred": 6.5 },
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": true
        },
        "chronic": ["Rede de concessionárias em expansão (limitada)", "Peso elevado (afeta a dirigibilidade mais esportiva)", "Central multimídia grande, mas complexa"],
        "image": "gwm-haval-h6-2025.webp",
        "photos": [
            "gwm-haval-h6-2025.webp"
        ]
    },
    {
        "id": "citroen-basalt-2025",
        "make": "Citroen",
        "model": "Basalt",
        "version": "1.0 Turbo 200 CVT",
        "year": 2025,
        "category": "SUV Cupê Compacto",
        "price": 135000,
        "fipe": "R$ 133.500",
        "weight": 1180,
        "specs": {
            "stock": { "hp": 130, "torque": 20.4, "zeroToHundred": 9.8 },
            "stage1": { "hp": 145, "torque": 23.0, "zeroToHundred": 8.9 },
            "stage2": { "hp": 160, "torque": 25.0, "zeroToHundred": 8.2 },
            "stage3": { "hp": 180, "torque": 28.0, "zeroToHundred": 7.5 }
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": false,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": false
        },
        "chronic": ["Apenas 2 airbags (herança da plataforma C3)", "Foco em custo-benefício (acabamento simples)", "Câmbio CVT (não tão rápido quanto o AT6)"],
        "image": "citroen-basalt-2025.webp",
        "photos": [
            "citroen-basalt-2025.webp"
        ]
    },
    {
        "id": "byd-song-plus-2025",
        "make": "BYD",
        "model": "Song Plus",
        "version": "1.5 Híbrido Plug-in DM-i",
        "year": 2025,
        "category": "SUV Médio Híbrido (PHEV)",
        "price": 239990,
        "fipe": "R$ 238.500",
        "weight": 1780,
        "specs": {
            "stock": { "hp": 235, "torque": 40.8, "zeroToHundred": 8.5 },
            "stage1": { "hp": 250, "torque": 43.0, "zeroToHundred": 8.0 },
            "stage2": { "hp": 270, "torque": 46.0, "zeroToHundred": 7.4 },
            "stage3": { "hp": 290, "torque": 49.0, "zeroToHundred": 6.8 },
        },
        "equipment": {
            "Teto Solar": true,
            "Painel Digital": true,
            "Controle de Largada": false,
            "Faróis Full LED": true,
            "Freio de Mão Elet.": true,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": true,
            "ACC": false
        },
        "chronic": ["Ausência de ACC e LKA (sistemas ADAS) nas versões atuais", "Peso elevado (impacta o consumo após o fim da carga)", "Rede de concessionárias em expansão (limitada)"],
        "image": "byd-song-plus-2025.webp",
        "photos": [
            "byd-song-plus-2025.webp"
        ]
    },
    {
        "id": "vw-tera-2025",
        "make": "Volkswagen",
        "model": "Tera",
        "version": "1.0 TSI AT",
        "year": 2025,
        "category": "SUV Compacto",
        "price": 116990,                    /* preço da versão TSI MT segundo divulgação */
        "fipe": "R$ 116.990",              /* exemplo simples igual ao preço de tabela */
        "weight": 1130,                    /* estimativa para a versão 1.0 TSI (peso informado ~1130 kg) :contentReference[oaicite:1]{index=1} */
        "specs": {
            "stock": {
                "hp": 116,
                "torque": 16.8,
                "zeroToHundred": 0           /* dado não divulgado */
            },
            "stage1": { "hp": 0, "torque": 0, "zeroToHundred": 0 },
            "stage2": { "hp": 0, "torque": 0, "zeroToHundred": 0 },
            "stage3": { "hp": 0, "torque": 0, "zeroToHundred": 0 },
        },
        "equipment": {
            "Teto Solar": false,
            "Painel Digital": true,          /* painel digital é disponível nas versões mais completas :contentReference[oaicite:2]{index=2} */
            "Controle de Largada": false,
            "Faróis Full LED": true,         /* LED é padrão nas versões divulgadas :contentReference[oaicite:3]{index=3} */
            "Freio de Mão Elet.": false,
            "Susp. Adaptativa": false,
            "Tração Integral": false,
            "Banco Elétrico": false,
            "ACC": true                      /* controle adaptativo de cruzeiro disponível em uma versão (Comfort) :contentReference[oaicite:4]{index=4} */
        },
        "chronic": [],
        "image": "vw-tera-2025.webp",
        "photos": [
            "vw-tera-2025.webp"
        ]
    }

]
