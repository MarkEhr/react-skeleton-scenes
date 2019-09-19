import { combineReducers } from 'redux';
import {reducer as api, loadingReducer as loading, loadingByIdReducer as loadingIds} from 'tide-api';

const rootReducer = combineReducers({
    api,
    loading,
    loadingIds
});

export default rootReducer;
