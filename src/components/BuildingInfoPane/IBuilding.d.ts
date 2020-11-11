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