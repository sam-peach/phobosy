import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import coordinates from './coordinates'

const reducer = combineReducers({coordinates})
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)
const store = createStore(reducer)

export default store
export * from './coordinates'
