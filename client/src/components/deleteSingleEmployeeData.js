const query = `
    mutation Mutation($id: Int!) {
        deleteEmployee(id: $id)
    }`;

async function deleteSingleEmployeeData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: data }),
  });
  return response;
}

export default deleteSingleEmployeeData;
