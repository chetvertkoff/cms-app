import {combineReducers} from 'redux'
import commonReducer from '../Reducer/common'
import fetchPages from './page';
import fetchMenu from './fetchMenu';

export default combineReducers({
    fetchMenu,
    commonReducer,
    fetchPages
})