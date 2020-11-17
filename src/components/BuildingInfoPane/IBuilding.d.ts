interface Building {
    idbuildings: number;
    building_identifier: number;
    building_name: string;
    country: string;
    city: string;
    typology: string;
    construction_type: string;
    A1A3?: number;
    A4?: number;
    B4_m?: number;
    B4_t?: number;
}

interface BuildingElement {
    idbuilding_elements: number;
    idlevels: number;
    name: string;
    A1A3?: number;
    A4?: number;
    B4_m?: number;
    B4_t?: number;
    hierarchy: number;
    idparent?: number;
}

interface Material {
    idmaterials: number;
    source: string;
    name: string;
    sourceType: string;
    dataYear?: string;
    FU: string;
    density: number?;
    EEf_A1A3: number;
    comments: string;
    materialCat: string;
    idbuilding_elements: number;
    idlevels: number;
    quantity: number;
    RSL_mi?: number;
    RSL?: number;
    A1A3?: number;
    A4?: number;
    B4_m?: number;
    B4_t?: number;
}