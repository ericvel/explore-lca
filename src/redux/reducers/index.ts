import {combineReducers} from 'redux';
import { buildings, selectedBuildings } from './buildings';
import { canSelectMultipleBuildings, isCompareDialogOpen } from './flags';
import { buildingElements, materialInventory, selectedBuildingElement, buildingElementRoute } from './elementsAndMaterials';

const rootReducer = combineReducers({
    buildings,
    selectedBuildings,
    canSelectMultipleBuildings,
    isCompareDialogOpen,
    buildingElements,
    materialInventory,
    selectedBuildingElement,
    buildingElementRoute
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;