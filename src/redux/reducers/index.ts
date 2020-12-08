import {combineReducers} from 'redux';
import { buildings, selectedBuildings } from './buildings';
import { canSelectMultipleBuildings, isCompareDialogOpen } from './flags';
import { buildingElements, materialInventory } from './elementsAndMaterials';

const rootReducer = combineReducers({
    buildings,
    selectedBuildings,
    canSelectMultipleBuildings,
    isCompareDialogOpen,
    buildingElements,
    materialInventory
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;