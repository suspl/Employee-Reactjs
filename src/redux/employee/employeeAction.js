import{ADD_EMPLOYEE} from "redux/employee/employeeType";

export function addEmployee(payload) {
  return { type: ADD_EMPLOYEE, payload }
};

