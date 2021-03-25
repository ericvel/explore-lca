import {
  SET_BUILDING_ELEMENTS,
  SET_MATERIAL_INVENTORY,
  SELECT_BUILDING_ELEMENT,
  SET_BUILDING_ELEMENT_ROUTE,
  ADD_TO_ELEMENT_ROUTE,
  HOVER_BUILDING_ELEMENT,
  STOP_HOVER_BUILDING_ELEMENT,
  SET_SIMULATED_DATA,
  SET_MATERIAL_PRODUCTS,
  SET_SIMULATED_MATERIAL_PRODUCTS,
  BuildingElementActionTypes,
  MaterialInventoryActionTypes,
  SelectBuildingElementAction,
  ElementRouteActionTypes,
  HoverBuildingElementActionTypes,
  SimulatedDataActionTypes,
  MaterialProductsActionTypes,
  SimulatedMaterialProductsActionTypes
} from "./types";

const setBuildingElements = (
  buildingElements: IBuildingElement[]
): BuildingElementActionTypes => {
  return {
    type: SET_BUILDING_ELEMENTS,
    payload: buildingElements,
  };
};

const setMaterialInventory = (
  materialInventory: IMaterialInventory[]
): MaterialInventoryActionTypes => {
  return {
    type: SET_MATERIAL_INVENTORY,
    payload: materialInventory,
  };
};
const selectBuildingElement = (
  buildingElement: IBuildingElement
): SelectBuildingElementAction => {
  return {
    type: SELECT_BUILDING_ELEMENT,
    payload: buildingElement,
  };
};

const addToElementRoute = (
  route: IBuildingElement
): ElementRouteActionTypes => {
  return {
    type: ADD_TO_ELEMENT_ROUTE,
    payload: route,
  };
};

const setElementRoute = (
  route: IBuildingElement[]
): ElementRouteActionTypes => {
  return {
    type: SET_BUILDING_ELEMENT_ROUTE,
    payload: route,
  };
};

const hoverBuildingElement = (
  elementId: number
): HoverBuildingElementActionTypes => {
  return {
    type: HOVER_BUILDING_ELEMENT,
    payload: elementId,
  };
};

const stopHoverBuildingElement = (
  elementId: number
): HoverBuildingElementActionTypes => {
  return {
    type: STOP_HOVER_BUILDING_ELEMENT,
    payload: elementId,
  };
};

const setSimulatedData = (
  simulatedData: ISimulatedData
): SimulatedDataActionTypes => {
  return {
    type: SET_SIMULATED_DATA,
    payload: simulatedData,
  };
};

const setMaterialProducts = (
  materialProducts: IMaterialTableParentRow[]
): MaterialProductsActionTypes => {
  return {
    type: SET_MATERIAL_PRODUCTS,
    payload: materialProducts,
  };
};

const setSimulatedMaterialProducts = (
  simulatedMaterialProducts: IMaterialTableParentRow[]
): SimulatedMaterialProductsActionTypes => {
  return {
    type: SET_SIMULATED_MATERIAL_PRODUCTS,
    payload: simulatedMaterialProducts,
  };
};

export default {
  setBuildingElements,
  setMaterialInventory,
  selectBuildingElement,
  addToElementRoute,
  setElementRoute,
  hoverBuildingElement,
  stopHoverBuildingElement,
  setSimulatedData,
  setMaterialProducts,
  setSimulatedMaterialProducts
};
