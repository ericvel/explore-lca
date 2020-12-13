import { 
    BuildingElementActionTypes, MaterialInventoryActionTypes, SelectBuildingElementAction, ElementRouteActionTypes,
    SET_BUILDING_ELEMENTS, SET_MATERIAL_INVENTORY, SELECT_BUILDING_ELEMENT, ADD_TO_ELEMENT_ROUTE, SET_BUILDING_ELEMENT_ROUTE
} from '../actions/types';

export const buildingElements = (state: IBuildingElement[] = [], action: BuildingElementActionTypes) => {
    switch (action.type) {
        case SET_BUILDING_ELEMENTS:
            return action.payload;
        default:
            return state;
    }
}

export const materialInventory = (state: IMaterialInventory[] = [], action: MaterialInventoryActionTypes) => {
    switch (action.type) {
        case SET_MATERIAL_INVENTORY:
            return action.payload;
        default:
            return state;
    }
}

const initialSelectedElementState: IBuildingElement = {
    idbuilding_elements: 0,
    idlevels: 0,
    name: "",
    hierarchy: 0,
    A1A3: null,
    A4: null,
    B4_m: null,
    B4_t: null,
    idparent: null
}; 

export const selectedBuildingElement = (state: IBuildingElement = initialSelectedElementState, action: SelectBuildingElementAction) => {
    switch (action.type) {
        case SELECT_BUILDING_ELEMENT:
            return action.payload;
        default:
            return state;
    }
}

export const buildingElementRoute = (state: IBuildingElement[] = [], action: ElementRouteActionTypes) => {
    switch (action.type) {
        case ADD_TO_ELEMENT_ROUTE:
            return [...state, action.payload]
        case SET_BUILDING_ELEMENT_ROUTE:
            return action.payload;
        default:
            return state;
    }
}