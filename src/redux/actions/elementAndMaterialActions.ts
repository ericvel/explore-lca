import { 
    SET_BUILDING_ELEMENTS, SET_MATERIAL_INVENTORY, SELECT_BUILDING_ELEMENT, SET_BUILDING_ELEMENT_ROUTE, ADD_TO_ELEMENT_ROUTE,
    BuildingElementActionTypes, MaterialInventoryActionTypes, SelectBuildingElementAction, ElementRouteActionTypes 
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
const selectBuildingElement = (buildingElement: IBuildingElement): SelectBuildingElementAction => {
    return {
        type: SELECT_BUILDING_ELEMENT,
        payload: buildingElement
    }
}

const addToElementRoute = (route: IBuildingElement): ElementRouteActionTypes => {
    return {
        type: ADD_TO_ELEMENT_ROUTE,
        payload: route
    }
}

const setElementRoute = (route: IBuildingElement[]): ElementRouteActionTypes => {
    return {
        type: SET_BUILDING_ELEMENT_ROUTE,
        payload: route
    }
}

export default {
    setBuildingElements,
    setMaterialInventory,
    selectBuildingElement,
    addToElementRoute,
    setElementRoute
}