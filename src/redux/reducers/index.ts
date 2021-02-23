import { combineReducers } from "redux";
import { buildings, selectedBuildings } from "./buildings";
import { isCompareDialogOpen } from "./flags";
import {
  buildingElements,
  materialInventory,
  selectedBuildingElement,
  buildingElementRoute,
  hoveredBuildingElement,
  simulationData,
} from "./elementsAndMaterials";
import {
  materialsGroupBy,
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
  materialsGroupBy,
  displayMode,
  canSelectMultipleBuildings,
  isSimulationModeActive,
  EEMetric,
  simulationData
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
