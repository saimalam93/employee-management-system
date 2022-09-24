import React from "react";
import "../styles/navbar.css";
import EmployeeSearch from "./EmployeeSearch.js";
import NavLinks from "./NavLinks.js";

class Navbar extends React.Component {
  render() {
    return (
      <header>
        <a className="logo" href="/">
          <h1>Employee Management System</h1>
        </a>
        <NavLinks />
        <EmployeeSearch />
      </header>
    );
  } // end of render
} // end of class

export default Navbar;
