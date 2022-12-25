import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducers';


const composeEnhancers = composeWithDevTools({
});
const rootReducer = combineReducers({ //Creted 'rootreducer' and combined reducers 
  carsReducer , //to get all cars
  alertsReducer //to get loader
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk) //applied thunk midlwr to make dispatches asyncronouse and coperate logics
 
  ) 
);
export default store;