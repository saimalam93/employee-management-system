import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate.js";
import EmployeeDirectory from "./EmployeeDirectory.js";
import EmployeeProfile from "./EmployeeProfile.js";
import EmployeeRetirement from "./EmployeeRetirement.js";

const NotFound = () => <h1 style={{ textAlign: "center" }}>Page Not Found!</h1>;

export default function Contents() {
  return (
    <Routes>
      <Route exact path="/" element={<EmployeeDirectory />} />
      <Route path="/employees" element={<EmployeeDirectory />} />
      <Route path="/employees/create" element={<EmployeeCreate />} />
      <Route path="/employees/retirement" element={<EmployeeRetirement />} />
      <Route path="/profile/:id" element={<EmployeeProfile />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
