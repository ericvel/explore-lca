import { BuildingActionTypes, SELECT_BUILDINGS, DESELECT_ALL_BUILDINGS } from '../actions/types';

const buildings = (state: IBuilding[] = [], action: BuildingActionTypes) => {
    switch (action.type) {
        case SELECT_BUILDINGS:
            return action.payload;
        case DESELECT_ALL_BUILDINGS:
            return [];
        default:
            return state;
    }
}

export default buildings;