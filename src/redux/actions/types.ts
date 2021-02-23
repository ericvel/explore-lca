export const SET_BUILDINGS = "SET_BUILDINGS";

export const SELECT_BUILDINGS = "SELECT_BUILDINGS";
export const DESELECT_ALL_BUILDINGS = "DESELECT_ALL_BUILDINGS";

export const SET_BUILDING_ELEMENTS = "SET_BUILDING_ELEMENTS";
export const SET_MATERIAL_INVENTORY = "SET_MATERIAL_INVENTORY";
export const SELECT_BUILDING_ELEMENT = "SELECT_BUILDING_ELEMENT";

export const ADD_TO_ELEMENT_ROUTE = "ADD_TO_ELEMENT_ROUTE";
export const SET_BUILDING_ELEMENT_ROUTE = "SET_BUILDING_ELEMENT_ROUTE";

export const TOGGLE_CAN_SELECT_MULTIPLE = "TOGGLE_CAN_SELECT_MULTIPLE";
export const TOGGLE_COMPARE_DIALOG_OPEN = "TOGGLE_COMPARE_DIALOG_OPEN";

export const HOVER_BUILDING_ELEMENT = "HOVER_BUILDING_ELEMENT";
export const STOP_HOVER_BUILDING_ELEMENT = "STOP_HOVER_BUILDING_ELEMENT";

export const SET_MATERIALS_GROUP_BY = "SET_CONTENT_TYPE";
export const SET_DISPLAY_MODE = "SET_DISPLAY_MODE";

export const SET_EE_METRIC = "SET_EE_METRIC";

export const TOGGLE_SIMULATION_MODE = "TOGGLE_SIMULATION_MODE";

export const SET_SIMULATION_DATA = "SET_SIMULATION_DATA";

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

export interface SelectBuildingElementAction {
  type: typeof SELECT_BUILDING_ELEMENT;
  payload: IBuildingElement;
}

interface AddToElementRouteAction {
  type: typeof ADD_TO_ELEMENT_ROUTE;
  payload: IBuildingElement;
}

interface SetElementRouteAction {
  type: typeof SET_BUILDING_ELEMENT_ROUTE;
  payload: IBuildingElement[];
}

interface ToggleCanSelectMultipleAction {
  type: typeof TOGGLE_CAN_SELECT_MULTIPLE;
}

export type ToggleCompareDialogOpenAction = {
  type: typeof TOGGLE_COMPARE_DIALOG_OPEN;
};

interface HoverBuildingElementAction {
  type: typeof HOVER_BUILDING_ELEMENT;
  payload: number;
}

interface StopHoverBuildingElementAction {
  type: typeof STOP_HOVER_BUILDING_ELEMENT;
  payload: number;
}

interface SetMaterialsGroupByAction {
  type: typeof SET_MATERIALS_GROUP_BY;
  payload: string;
}

interface SetDisplayModeAction {
  type: typeof SET_DISPLAY_MODE;
  payload: string;
}

interface SetEEMetricAction {
  type: typeof SET_EE_METRIC;
  name: string;
  checked: boolean;
}

interface ToggleSimulationModeAction {
  type: typeof TOGGLE_SIMULATION_MODE;
}

interface SetSimulationData {
  type: typeof SET_SIMULATION_DATA;
  payload: ISimulationData[];
}

export type BuildingActionTypes = SetBuildingsAction;
export type SelectedBuildingActionTypes =
  | SelectBuildingsAction
  | DeselectAllBuildingsAction;
export type BuildingElementActionTypes = SetBuildingElementsAction;
export type MaterialInventoryActionTypes = SetMaterialInventoryAction;
export type ElementRouteActionTypes =
  | AddToElementRouteAction
  | SetElementRouteAction;
export type HoverBuildingElementActionTypes =
  | HoverBuildingElementAction
  | StopHoverBuildingElementAction;
export type MaterialsGroupByActionTypes = SetMaterialsGroupByAction;
export type DisplayModeActionTypes = SetDisplayModeAction;
export type CanSelectMultipleActionTypes = ToggleCanSelectMultipleAction;
export type EEMetricActionTypes = SetEEMetricAction;
export type SimulationModeActionTypes = ToggleSimulationModeAction;
export type SimulationDataActionTypes = SetSimulationData;
