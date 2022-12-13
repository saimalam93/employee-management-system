import React from "react";
import URLSearchParams from "url-search-params";
import "../styles/table.css";
import EmployeeTable from "./EmployeeTable.js";
import getEmployeeData from "./getEmployeeData.js";
import getSingleEmployeeData from "./getSingleEmployeeData.js";

class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.url = "https://ems-saimalam.onrender.com/graphql";
    this.state = { employees: [] };
    this.updateEmployee = this.updateEmployee.bind(this);
  } // end of constructor

  componentDidMount() {
    let queryParams = new URLSearchParams(window.location.search);
    let filters = {
      title: queryParams.get("title"),
      department: queryParams.get("department"),
      employeeType: queryParams.get("employeeType"),
    };

    this.loadData(filters);
  } // end of componentDidMount

  loadData(filters = {}) {
    getEmployeeData(this.url, { filters: filters }).then((result) => {
      this.setState({ employees: result.data.listAllEmployees });
      return result.data.employees;
    });
  } // end of loadData

  async updateEmployee(employee) {
    let employees = this.state.employees;
    let index = employees.findIndex((e) => e.id === employee.id);

    let result = await getSingleEmployeeData(this.url, {
      id: employee.id,
    })
      .then((result) => result.data.listSingleEmployee)
      .catch(() => {
        return false;
      });

    // handle if employee is updated or deleted
    if (result) {
      employees[index] = result;
      this.setState({ employees: employees });
    } else {
      employees.splice(index, 1);
      this.setState({ employees: employees });
    }
  } // end of updateEmployee

  render() {
    return (
      <React.Fragment>
        <EmployeeTable
          employees={this.state.employees}
          updateEmployee={this.updateEmployee}
        />
      </React.Fragment>
    );
  } // end of render
} // end of class

export default EmployeeDirectory;
