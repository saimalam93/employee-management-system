import React from "react";

class EmployeeSearch extends React.Component {
  render() {
    return (
      <div className="searchBar">
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search Employee Database"
          />
          <input
            type="image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/1200px-Vector_search_icon.svg.png"
            alt="Search"
          />
        </form>
      </div>
    );
  } // end of render
} // end of class

export default EmployeeSearch;
