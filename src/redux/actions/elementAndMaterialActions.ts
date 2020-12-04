import { SET_BUILDING_ELEMENTS, SET_MATERIAL_INVENTORY, BuildingElementActionTypes, MaterialInventoryActionTypes } from './types'

const setBuildingElements = (buildingElements: IBuildingElement[]): BuildingElementActionTypes => {
    return {
        type: SET_BUILDING_ELEMENTS,
        payload: buildingElements
    }
}

const setMaterialInventory = (materialInventory: IMaterialInventory[]): MaterialInventoryActionTypes => {
    return {
        type: SET_MATERIAL_INVENTORY,
        payload: materialInventory
    }
}

export default {
    setBuildingElements,
    setMaterialInventory
}