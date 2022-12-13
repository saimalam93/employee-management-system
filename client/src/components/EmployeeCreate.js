import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/form.css";
import setEmployeeData from "./setEmployeeData.js";

function EmployeeCreate() {
  const url = "https://ems-saimalam.onrender.com/graphql";
  const navigate = useNavigate();

  async function createEmployee(employee) {
    const response = await setEmployeeData(url, { employee });

    if (response.ok) {
      navigate("/");
    }
  } // end of createEmployee

  function toastErrors(errors) {
    errors.forEach((error) => {
      toast.error(error.message, {
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
    });
  } // end of toastErrors

  function handleSubmit(event) {
    let errors = [];
    const form = event.target;
    event.preventDefault();
    if (
      form.fname.value === "" ||
      form.lname.value === "" ||
      form.age.value === "" ||
      form.employeeType.value === "null"
    ) {
      if (form.fname.value === "") {
        errors.push({
          message: "First name is required",
        });
      }
      if (form.lname.value === "") {
        errors.push({
          message: "Last name is required",
        });
      }
      if (form.age.value === "") {
        errors.push({
          message: "Age is required",
        });
      }
      if (form.employeeType.value === "null") {
        errors.push({
          message: "Employee type is required",
        });
      }
      toastErrors(errors);
    } else {
      if (form.dateOfJoining.value === "") {
        form.dateOfJoining.value = moment().format("YYYY-MM-DD");
      }
      const employee = {
        fname: form.fname.value,
        lname: form.lname.value,
        age: parseInt(form.age.value),
        dateOfJoining: form.dateOfJoining.value,
        title: form.title.value,
        department: form.department.value,
        employeeType: form.employeeType.value,
      };
      createEmployee(employee);
      form.reset();
    }
  } // end of handleSubmit

  return (
    <React.Fragment>
      <>
        <ToastContainer />
      </>
      <div className="cards">
        <h2>Employee Create</h2>
        <form
          className="addEmployee"
          name="addEmployee"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>First Name:</label>
            <input
              name="fname"
              type="text"
              placeholder="Enter First Name"
              // required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              name="lname"
              type="text"
              placeholder="Enter Last Name"
              // required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              name="age"
              type="number"
              min="20"
              max="70"
              placeholder="Enter Age"
              // required
            />
          </div>
          <div className="form-group">
            <label>Date of Joining:</label>
            <input name="dateOfJoining" type="date" />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <select name="title">
              <option defaultValue="null" value="No Title Assigned" hidden>
                Select The Job Title
              </option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select name="department">
              <option defaultValue="null" value="No Dept. Assigned" hidden>
                Select The Department
              </option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="form-group">
            <label>Employee Type:</label>
            <select name="employeeType">
              <option value="null" hidden>
                Select The Employee Type
              </option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Add Employee" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
} // end of EmployeeCreate

export default EmployeeCreate;
