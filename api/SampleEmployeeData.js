require("./models/db");
const Employee = require("./models/employee");

const initialEmployees = [
  {
    id: 1,
    fname: "John",
    lname: "Doe",
    age: 30,
    dateOfJoining: new Date("01/01/2018"),
    title: "Director",
    department: "IT",
    employeeType: "Contract",
    currentStatus: 1,
  },
  {
    id: 2,
    fname: "Jane",
    lname: "Doe",
    age: 25,
    dateOfJoining: new Date("01/01/2018"),
    title: "VP",
    department: "Marketing",
    employeeType: "Full Time",
    currentStatus: 1,
  },
];

Employee.insertMany(initialEmployees);
