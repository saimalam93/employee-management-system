const query = `
    mutation CreateEmployee($employee: EmployeeInputs!) {
        createEmployee(employee: $employee) {
          id
          fname
          lname
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;

async function setEmployeeData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: data }),
  });
  return response;
}

export default setEmployeeData;
