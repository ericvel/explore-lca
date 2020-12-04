export const SELECT_BUILDINGS = 'SELECT_BUILDINGS';
export const DESELECT_ALL_BUILDINGS = 'DESELECT_ALL_BUILDINGS';
export const TOGGLE_SELECT_MULTIPLE_SWITCH = 'TOGGLE_SELECT_MULTIPLE_SWITCH';

interface SelectBuildingsAction {
    type: typeof SELECT_BUILDINGS;
    payload: IBuilding[];
}

interface DeselectAllBuildingsAction {
    type: typeof DESELECT_ALL_BUILDINGS;
}

export type ToggleSelectMultipleSwitchAction = {
    type: typeof TOGGLE_SELECT_MULTIPLE_SWITCH;
}

export type BuildingActionTypes = SelectBuildingsAction | DeselectAllBuildingsAction;
// export type { ToggleSelectMultipleSwitchAction };