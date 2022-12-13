import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteSingleEmployeeData from "./deleteSingleEmployeeData.js";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeRowEditable from "./EmployeeRowEditable.js";
import EmployeeRowReadOnly from "./EmployeeRowReadOnly.js";
import updateEmployeeData from "./updateEmployeeData.js";

class EmployeeTable extends React.Component {
  constructor() {
    super();
    this.url = "https://ems-saimalam.onrender.com/graphql";
    this.state = { editIndex: null };
    this.handleEditClick = this.handleEditClick.bind(this);
  } // end of constructor

  async updateEmployee(employee) {
    const result = await updateEmployeeData(this.url, { employee });
    if (result.ok) {
      this.props.updateEmployee(employee);
      this.setState({ editIndex: null });
    }
  } // end of updateEmployee

  async deleteEmployee(employee) {
    let id = employee.id;
    const result = await deleteSingleEmployeeData(this.url, { id });
    if (result.ok) {
      this.props.updateEmployee(employee);
      this.setState({ editIndex: null });
    }
  } // end of deleteEmployee

  handleEditClick = (event, id) => {
    event.preventDefault();
    this.setState({ editIndex: id });
  }; // end of handleEditClick

  handleSaveClick = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = parseInt(form.id.value);

    if (form.currentStatus.value === "") {
      toast.error("Current Status is required", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "toast-error",
        bodyClassName: "toast-body-error",
        transition: Bounce,
        type: "error",
      });
    } else {
      const employee = {
        id: id,
        title: form.title.value,
        department: form.department.value,
        currentStatus: parseInt(form.currentStatus.value),
      };
      this.updateEmployee(employee);
    }
  }; // end of handleSaveClick

  handleCancelEditClick = () => {
    this.setState({ editIndex: null });
  }; // end of cancelEdit

  handleDeleteClick = (event, id) => {
    event.preventDefault();
    let employee = this.props.employees.find((employee) => employee.id === id);
    if (employee.currentStatus === 1) {
      toast.error("CAN’T DELETE EMPLOYEE – STATUS ACTIVE", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "toast-error-delete",
        bodyClassName: "toast-body-error",
        transition: Bounce,
        type: "error",
      });
    } else {
      this.deleteEmployee(employee);
    }
  }; // end of handleDeleteClick

  render() {
    return (
      <React.Fragment>
        <>
          <ToastContainer />
        </>
        <div className="cards">
          <EmployeeFilter />
          <h2>Employee Table</h2>
          <form onSubmit={this.handleSaveClick}>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Date of Joining</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Employee Type</th>
                  <th>Current Status</th>
                  {this.props.employees.retirementSet != null ? (
                    <th>Retirement Date</th>
                  ) : null}
                  <th>View</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.employees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    {this.state.editIndex === employee.id ? (
                      <EmployeeRowEditable
                        employee={employee}
                        updateEmployee={this.props.updateEmployee}
                        handleCancelEditClick={this.handleCancelEditClick}
                      />
                    ) : (
                      <EmployeeRowReadOnly
                        employee={employee}
                        handleEditClick={this.handleEditClick}
                        handleDeleteClick={this.handleDeleteClick}
                      />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </React.Fragment>
    );
  } // end of render
} // end of class

export default EmployeeTable;
