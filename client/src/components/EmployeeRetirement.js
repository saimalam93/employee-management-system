import moment from "moment";
import React from "react";
import EmployeeTable from "./EmployeeTable";
import getEmployeeData from "./getEmployeeData";
import getSingleEmployeeData from "./getSingleEmployeeData.js";

class EmployeeRetirement extends React.Component {
  constructor() {
    super();
    this.url = "https://ems-saimalam.onrender.com/graphql";
    this.state = { employees: [] };
    this.updateEmployee = this.updateEmployee.bind(this);
  }
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
      this.calcRetirement(result.data.listAllEmployees);
      return result.data.employees;
    });
  } // end of loadData

  calcRetirement(employees) {
    let retiring = employees.filter((employee) => {
      let retirementYears = 65 - employee.age;
      let retirementDate = moment(employee.dateOfJoining).add(
        retirementYears,
        "years"
      );
      let months = moment(retirementDate).diff(moment(), "months");
      let days = moment(retirementDate).diff(moment(), "days");
      if (months < 6 || (months === 6 && days <= 0)) {
        employee.retirement = retirementDate.format("Do MMM YYYY");
        return employees;
      }
      return false;
    });
    employees = retiring;
    employees.retirementSet = true;
    this.setState({ employees: employees });
  }

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
      this.calcRetirement(employees);
    } else {
      employees.splice(index, 1);
      this.setState({ employees: employees });
    }
  } // end of updateEmployee

  render() {
    return (
      <div>
        <EmployeeTable
          employees={this.state.employees}
          updateEmployee={this.updateEmployee}
        />
      </div>
    );
  }
}

export default EmployeeRetirement;
