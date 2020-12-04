import {combineReducers} from 'redux';
import buildings from './buildings';
import selectMultipleBuildingsFlag from './flags';

const rootReducer = combineReducers({
    buildings,
    selectMultipleBuildingsFlag
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;