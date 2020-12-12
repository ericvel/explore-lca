import { 
    SET_BUILDING_ELEMENTS, SET_MATERIAL_INVENTORY, SELECT_BUILDING_ELEMENT, SET_BUILDING_ELEMENT_ROUTE,
    BuildingElementActionTypes, MaterialInventoryActionTypes, SelectBuildingElementAction, SetBuildingElementRouteAction 
} from './types'

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
const selectBuildingElementAction = (buildingElement: IBuildingElement): SelectBuildingElementAction => {
    return {
        type: SELECT_BUILDING_ELEMENT,
        payload: buildingElement
    }
}

const setBuildingElementRouteAction = (route: IBuildingElement[]): SetBuildingElementRouteAction => {
    return {
        type: SET_BUILDING_ELEMENT_ROUTE,
        payload: route
    }
}

export default {
    setBuildingElements,
    setMaterialInventory,
    selectBuildingElementAction,
    setBuildingElementRouteAction
}