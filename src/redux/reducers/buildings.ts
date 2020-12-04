import { BuildingActionTypes, SELECT_BUILDINGS } from '../types';

const buildings = (state = [], action: BuildingActionTypes) => {
    switch (action.type) {
        case SELECT_BUILDINGS:
            return {
                ...state,
                buildings: action.payload
            }
        default:
            return state
    }
}

export default buildings;