import { Link } from "react-router-dom";

function NavLinks() {
  return (
    <nav>
      <a href="/">Home</a>
      <Link to="/employees/create">Create Employee</Link>
      <Link to="/employees/retirement">Up Coming Retirement</Link>
    </nav>
  );
}

export default NavLinks;
