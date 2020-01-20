import { createStore, applyMiddleware } from "redux";
import employeeReducer from "redux/employee/employeeReducer";
import {addEmployee} from "redux/employee/employeeAction";
import {logger} from "redux-logger";

//const store = createStore(rootReducer);

const store = createStore(employeeReducer,applyMiddleware(logger));
export default store;

//var initstate = store.getState();//gets current state value

//store.dispatch( addEmployee({ name: 'Priya', id: 2 }) );//notifying the store that we want to change the state.
//store.subscribe(() => console.log('Look ma, Redux!!'));//listening on state changes
//console.log("s==="+store.getState().EmployeeDetails);//gets current state value after dispatch method