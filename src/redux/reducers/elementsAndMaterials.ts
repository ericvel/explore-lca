import { BuildingElementActionTypes, MaterialInventoryActionTypes, SET_BUILDING_ELEMENTS, SET_MATERIAL_INVENTORY } from '../actions/types';

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