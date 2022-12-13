import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/filter.css";
import "../styles/profile.css";
import getSingleEmployeeData from "./getSingleEmployeeData.js";

function EmployeeProfile() {
  const { id } = useParams();
  const url = "https://ems-saimalam.onrender.com/graphql";

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    loadData(parseInt(id));
  }, [id]);

  function loadData(id) {
    getSingleEmployeeData(url, { id: id }).then((result) => {
      calcRetirement(result.data.listSingleEmployee);
    });
  } // end of loadData

  function calcRetirement(employee) {
    let retirementYears = 65 - employee.age;
    let retirementDate = moment(employee.dateOfJoining).add(
      retirementYears,
      "years"
    );
    let retirementTime = moment.duration(moment(retirementDate).diff(moment()));
    employee.retirementDays = retirementTime.days() + 1;
    employee.retirementMonths = retirementTime.months();
    employee.retirementYears = retirementTime.years();
    setEmployee(employee);
  }

  return (
    <React.Fragment>
      <div className="cards">
        <h2>Employee Profile</h2>
        <div className="userProfile">
          <img src={require("../Images/manIcon.png")} alt="employee" />
          <div className="userInfo">
            <h3>
              {employee.fname} {employee.lname}
            </h3>
            <h4>
              {employee.title} | {employee.department}
            </h4>
            <h5>Employee Id - {employee.id}</h5>
            <h5>File Number - {employee._id}</h5>
            <p>
              <span>Age:</span> {employee.age}
            </p>
            <p>
              <span>Date of Joining:</span>{" "}
              {moment(employee.dateOfJoining).utc().format("Do MMM YYYY")}
            </p>
            <p>
              <span>Employee Type:</span> {employee.employeeType}
            </p>
            <p>
              <span>Retirement Time:</span> {employee.retirementDays} days,{" "}
              {employee.retirementMonths} months{" "}
              {employee.retirementYears !== 0
                ? ", " + employee.retirementYears + " years"
                : ""}
            </p>
            <button type="button" className="btnProfileView">
              Go to Linkedin
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EmployeeProfile;
