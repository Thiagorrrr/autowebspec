"use client"
import BrandDetail from "@/components/BrandDetail";
import { Car, dataCars } from "@/components/Main/data";
import { useMemo } from "react";
import { BRAND_INFO, CarBrand, COLORS } from "@/components/BrandList";


const marca = ({ params }: { params: { marca: string } }) => {

    const { marca } = params;

    const RAW_CARS = dataCars()

    const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));

    // 2. Catálogo de Carros Otimizado (Make -> Model -> Year)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const carCatalog: CarBrand[] = useMemo(() => {
        const catalog: Record<string, CarBrand> = {};

        CARS.forEach(car => {
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

        return Object.values(catalog);
    }, []);
    return (
        <BrandDetail carCatalog={carCatalog} make={marca} />
    )
}

export default marca