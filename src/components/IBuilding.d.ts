interface Building {
    idbuildings: number;
    building_identifier: number;
    building_name: string;
    country: string;
    city: string;
    typology: string;
    construction_type: string;
    A1A3: number?;
    A4: number?;
    B4_m: number?;
    B4_t: number?;
}

interface BuildingElement {
    idbuilding_elements: number;
    idlevels: number;
    name: string;
    A1A3: number?;
    A4: number?;
    B4_m: number?;
    B4_t: number?;
    hierarchy: number;
    idparent: number?;
}

interface MaterialInventory {
    idmaterialInventory: number;
    idmaterials: number;
    name: string;
    source: string;
    dataType: string;
    sourceType: string;
    dataYear?: string;
    FU: string;
    density: number?;
    EEf_A1A3: number;
    RSL: number?;
    comments: string?;
    materialCat: string;
    quantity: number;    
    RSL_mi: number?;    
    A1A3: number?;
    A4: number?;
    B4_m: number?;
    B4_t: number?;
    idbuilding_elements: number;
    buildingElementName: string;
}

interface IDataItem {
    lcaPhase: string,
    gwp: number,
}