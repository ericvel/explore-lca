export const SELECT_BUILDINGS = 'SELECT_BUILDINGS';

interface SelectBuildingsAction {
    type: typeof SELECT_BUILDINGS;
    payload: IBuilding[];
}

export type BuildingActionTypes = SelectBuildingsAction;