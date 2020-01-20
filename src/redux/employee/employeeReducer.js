import{ADD_EMPLOYEE} from "redux/employee/employeeType";
import store from "./store";
const initialState = {
  EmployeeDetails: []
};
//getAllUserDetails();
// function getAllUserDetails()
// {
//   //fetch('https://localhost:8082/employee/employeeMaster/viewAll')
//   fetch('http://localhost:4000/getUserDetails')
//   .then(res=>res.json())
//   .then(json=>{
//     var responseLength = Object.keys(json).length;
//     if(responseLength!=0){
//       // this.setState({
//       //   items:json
//       // });
//       initialState.EmployeeDetails=json;
//     }
//   });
// }
function employeeReducer(state = initialState, action) {
  switch(action.type)
  {
    case ADD_EMPLOYEE:return{
      ...state,//copy of the state
      EmployeeDetails: state.EmployeeDetails.concat(action.payload)
    }
    default:return state;
  }
}
export default employeeReducer;

//console.log("initialState=="+initialState.EmployeeDetails);