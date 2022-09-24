import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

class EmployeeRowEditable extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <input type="hidden" name="id" value={this.props.employee.id} />
          <input
            name="fname"
            type="text"
            placeholder="Enter First Name"
            value={this.props.employee.fname}
            readOnly
          />
        </td>
        <td>
          <input
            name="lname"
            type="text"
            placeholder="Enter Last Name"
            value={this.props.employee.lname}
            readOnly
          />
        </td>
        <td>
          <input
            name="age"
            type="number"
            min="20"
            max="70"
            placeholder="Enter Age"
            value={this.props.employee.age}
            readOnly
          />
        </td>
        <td>
          <input
            name="dateOfJoining"
            type="date"
            value={moment(this.props.employee.dateOfJoining)
              .utc()
              .format("YYYY-MM-DD")}
            readOnly
          />
        </td>
        <td>
          <select name="title">
            <option defaultValue="null" value="No Title Assigned" hidden>
              Select The Job Title
            </option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </td>
        <td>
          <select name="department">
            <option defaultValue="null" value="No Dept. Assigned" hidden>
              Select The Department
            </option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            name="employeeType"
            value={this.props.employee.employeeType}
            readOnly
          />
        </td>
        <td>
          <input
            name="currentStatus"
            type="number"
            min={0}
            max={2}
            autoComplete="off"
          />
        </td>
        {this.props.employee.retirement != null ? (
          <td>{this.props.employee.retirement}</td>
        ) : null}
        <td>
          <Link className="btnView" to={`/profile/${this.props.employee.id}`}>
            View
          </Link>
        </td>
        <td>
          <button type="submit" className="btnSave">
            Save
          </button>
          <button
            className="btnCancel"
            onClick={this.props.handleCancelEditClick}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  } // end of render
} // end of class

export default EmployeeRowEditable;
