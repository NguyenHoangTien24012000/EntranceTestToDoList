import {createStore,combineReducers} from 'redux'
import TaskListReducer from './reducer/TaskListReducer'
import RedirectReducer from './reducer/RedirectReducer'


const rootReducer = combineReducers({
    TaskListReducer,
    RedirectReducer
})


export const store = createStore(rootReducer)