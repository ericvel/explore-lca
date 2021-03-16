import { combineReducers } from "redux";
import { buildings, selectedBuildings } from "./buildings";
import { isCompareDialogOpen } from "./flags";
import {
  buildingElements,
  materialInventory,
  selectedBuildingElement,
  buildingElementRoute,
  hoveredBuildingElement,
  simulatedData,
  materialProducts,
  simulatedMaterialProducts,
} from "./elementsAndMaterials";
import {
  materialsGroupBy,
  displayMode,
  canSelectMultipleBuildings,
  isSimulationModeActive,
} from "./ui";
import { EEMetric } from "./settings";
import { currentUser } from "./user";

const rootReducer = combineReducers({
  buildings,
  selectedBuildings,
  isCompareDialogOpen,
  buildingElements,
  materialInventory,
  selectedBuildingElement,
  buildingElementRoute,
  hoveredBuildingElement,
  materialsGroupBy,
  displayMode,
  canSelectMultipleBuildings,
  isSimulationModeActive,
  EEMetric,
  simulatedData,
  currentUser,
  materialProducts,
  simulatedMaterialProducts,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
