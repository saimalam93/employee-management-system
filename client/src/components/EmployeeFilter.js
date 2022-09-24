import React, { useRef } from "react";
import "../styles/filter.css";

function EmployeeFilter() {
  const selectForm = useRef(null);

  const handleSubmit = () => {
    selectForm.current.submit();
  };
  return (
    <div className="filter-options">
      <form ref={selectForm} onChange={handleSubmit}>
        <h4>Filter Options</h4>
        <select name="title">
          <option value="">Title</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </select>
        <select name="department">
          <option value="">Department</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
        <select name="employeeType">
          <option value="">Employee Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
        <input type="submit" value="Reset Filters" />
      </form>
    </div>
  );
}

export default EmployeeFilter;
