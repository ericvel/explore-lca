import { SET_BUILDINGS, BuildingActionTypes, SELECT_BUILDINGS, DESELECT_ALL_BUILDINGS, SelectedBuildingActionTypes } from './types'

const setBuildings = (buildings: IBuilding[]): BuildingActionTypes => {
    return {
        type: SET_BUILDINGS,
        payload: buildings
    }
}

const selectBuildings = (buildings: IBuilding[]): SelectedBuildingActionTypes => {
    return {
        type: SELECT_BUILDINGS,
        payload: buildings
    }
}

const deselectAllBuildings = (): SelectedBuildingActionTypes => {
    return {
        type: DESELECT_ALL_BUILDINGS
    }
}

export default {
    setBuildings,
    selectBuildings,
    deselectAllBuildings
}