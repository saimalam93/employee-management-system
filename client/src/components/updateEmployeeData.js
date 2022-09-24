const query = `mutation UpdateEmployee($employee: EmployeeUpdateInputs) {
    updateEmployee(employee: $employee)
  }`;

async function updateEmployeeData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: data }),
  });
  return response;
}

export default updateEmployeeData;
