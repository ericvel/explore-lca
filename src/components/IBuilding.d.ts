interface IBuilding {
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

interface IBuildingElement {
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

interface IMaterialInventory {
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

interface ISingleChartDataItem {
    lcaPhase: string,
    gwp: number,
}

/* interface ICompareChartDataItem {
    buildingName: string;
    a1a3: number;
    a4: number;
    b4_m: number;
    b4_t: number;
} */

interface ITestChartData {
    lcaPhase: string
}

interface IValue {
    prop: string | number;
}

interface ICompareChartDataItem {
    lcaPhase: string;
    [key: string]: string | number;
}