import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

class EmployeeRowReadOnly extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.employee.fname}</td>
        <td>{this.props.employee.lname}</td>
        <td>{this.props.employee.age}</td>
        <td>
          {moment(this.props.employee.dateOfJoining)
            .utc()
            .format("Do MMM YYYY")}
        </td>
        <td>{this.props.employee.title}</td>
        <td>{this.props.employee.department}</td>
        <td>{this.props.employee.employeeType}</td>
        <td>{this.props.employee.currentStatus}</td>
        {this.props.employee.retirement != null ? (
          <td>{this.props.employee.retirement}</td>
        ) : null}
        <td>
          <Link className="btnView" to={`/profile/${this.props.employee.id}`}>
            View
          </Link>
        </td>
        <td>
          <button
            type="button"
            className="btnEdit"
            onClick={(event) =>
              this.props.handleEditClick(event, this.props.employee.id)
            }
          >
            Edit
          </button>
          <button
            type="button"
            className="btnDelete"
            onClick={(event) =>
              this.props.handleDeleteClick(event, this.props.employee.id)
            }
          >
            Delete
          </button>
        </td>
      </tr>
    );
  } // end of render
} // end of class

export default EmployeeRowReadOnly;
