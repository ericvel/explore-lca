import { combineReducers } from "redux";
import { buildings, selectedBuildings } from "./buildings";
import { isCompareDialogOpen } from "./flags";
import {
  buildingElements,
  materialInventory,
  selectedBuildingElement,
  buildingElementRoute,
  hoveredBuildingElement,
} from "./elementsAndMaterials";
import {
  contentType,
  displayMode,
  canSelectMultipleBuildings,
  isSimulationModeActive,
} from "./ui";
import { EEMetric } from "./settings";

const rootReducer = combineReducers({
  buildings,
  selectedBuildings,
  isCompareDialogOpen,
  buildingElements,
  materialInventory,
  selectedBuildingElement,
  buildingElementRoute,
  hoveredBuildingElement,
  contentType,
  displayMode,
  canSelectMultipleBuildings,
  isSimulationModeActive,
  EEMetric,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
