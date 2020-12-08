export const SET_BUILDINGS = 'SET_BUILDINGS';

export const SELECT_BUILDINGS = 'SELECT_BUILDINGS';
export const DESELECT_ALL_BUILDINGS = 'DESELECT_ALL_BUILDINGS';

export const TOGGLE_CAN_SELECT_MULTIPLE = 'TOGGLE_CAN_SELECT_MULTIPLE';
export const TOGGLE_COMPARE_DIALOG_OPEN = 'TOGGLE_COMPARE_DIALOG_OPEN';

export const SET_BUILDING_ELEMENTS = 'SET_BUILDING_ELEMENTS';
export const SET_MATERIAL_INVENTORY = 'SET_MATERIAL_INVENTORY';

interface SetBuildingsAction {
    type: typeof SET_BUILDINGS;
    payload: IBuilding[];
}

interface SelectBuildingsAction {
    type: typeof SELECT_BUILDINGS;
    payload: IBuilding[];
}

interface DeselectAllBuildingsAction {
    type: typeof DESELECT_ALL_BUILDINGS;
}

interface SetBuildingElementsAction {
    type: typeof SET_BUILDING_ELEMENTS;
    payload: IBuildingElement[];
}

interface SetMaterialInventoryAction {
    type: typeof SET_MATERIAL_INVENTORY;
    payload: IMaterialInventory[];
}

export type ToggleCanSelectMultipleAction = {
    type: typeof TOGGLE_CAN_SELECT_MULTIPLE;
}

export type ToggleCompareDialogOpen = {
    type: typeof TOGGLE_COMPARE_DIALOG_OPEN;
}

export type BuildingActionTypes = SetBuildingsAction;
export type SelectedBuildingActionTypes = SelectBuildingsAction | DeselectAllBuildingsAction;
export type BuildingElementActionTypes = SetBuildingElementsAction;
export type MaterialInventoryActionTypes = SetMaterialInventoryAction;
// export type { ToggleSelectMultipleSwitchAction };