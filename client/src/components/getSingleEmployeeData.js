const query = `query ListSingleEmployee($id: Int!) {
  listSingleEmployee(id: $id) {
    _id
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

async function getSingleEmployeeData(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default getSingleEmployeeData;
