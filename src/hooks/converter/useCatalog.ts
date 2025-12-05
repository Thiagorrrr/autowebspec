import { BRAND_INFO, CarBrand, COLORS, ViewType } from "@/components/BrandList";
import { Car } from "@/components/Main/data";

export interface NavigationState {
    view: ViewType;
    make?: string;
    model?: string;
    year?: number;
    versionId?: string;
}

export const useCatalog = (cars: Car[]) => {
    const CARS = cars
    const catalog: Record<string, CarBrand> = {};

    CARS.forEach((car: Car) => {
        const { make, model, year } = car;

        // 1. Nível Marca (Make)
        if (!catalog[make]) {
            catalog[make] = {
                make,
                description: BRAND_INFO[make]?.description || '',
                logoColor: BRAND_INFO[make]?.logoColor || COLORS.gray400,
                models: []
            };
        }

        const brand = catalog[make];

        // 2. Nível Modelo (Model)
        let modelEntry = brand.models.find(m => m.model === model);
        if (!modelEntry) {
            modelEntry = { model, years: [] };
            brand.models.push(modelEntry);
        }

        // 3. Nível Ano (Year)
        let yearEntry = modelEntry.years.find(y => y.year === year);
        if (!yearEntry) {
            yearEntry = { year, versions: [] };
            modelEntry.years.push(yearEntry);
        }

        // 4. Nível Versão (Car)
        yearEntry.versions.push(car);
    });

    // Ordenar anos (opcional)
    Object.values(catalog).forEach(brand => {
        brand.models.forEach(model => {
            model.years.sort((a, b) => b.year - a.year);
        });
    });

    return {
        carCatalog: Object.values(catalog)
    }
}