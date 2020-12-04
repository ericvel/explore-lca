import { SELECT_BUILDINGS, BuildingActionTypes } from '../types'

const selectBuildings = (buildings: IBuilding[]): BuildingActionTypes => {
    return {
        type: SELECT_BUILDINGS,
        payload: buildings
    }
}

export default {
    selectBuildings
}