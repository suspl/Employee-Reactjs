import React from "react";
import {store} from "redux/employee/store";
import {useSelector,useDispatch} from "react-redux";
import {addEmployee} from "redux/employee/employeeAction";

// const mapStateToProps = (state)=>
// {
//  // console.log("state====11"+state.EmployeeDetails[0].name);
//   return{employeeDetails:state.EmployeeDetails};
// };
// const EmpList = connect(mapStateToProps)(employeeName);
// const EmpList = ({ employeeDetails }) => (
//   <ul>
//     {employeeDetails.map(el => (
//       <li key={el.id}>{el.name}</li>
//     ))}
//   </ul>
// );

function EmpList()
{
  const employeeDetails = useSelector(state=>state.EmployeeDetails);
  const dispatch = useDispatch();
  return(
    <div>
      <ul>
        {employeeDetails.map(el => (
          <li key={el.id}>{el.FirstName}</li>
        ))}
      </ul>
      <button type='button' onClick={()=>
        {
          dispatch(addEmployee({ FirstName: 'Priya', _id: 2 }));
        }
      }>Add</button>
    </div>
  )
}


export default EmpList;