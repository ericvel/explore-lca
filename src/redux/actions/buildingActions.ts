import { SELECT_BUILDINGS, DESELECT_ALL_BUILDINGS, BuildingActionTypes } from './types'

const selectBuildings = (buildings: IBuilding[]): BuildingActionTypes => {
    return {
        type: SELECT_BUILDINGS,
        payload: buildings
    }
}

const deselectAllBuildings = (): BuildingActionTypes => {
    return {
        type: DESELECT_ALL_BUILDINGS
    }
}

export default {
    selectBuildings,
    deselectAllBuildings
}