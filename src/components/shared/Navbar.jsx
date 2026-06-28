import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">
          SportNest
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/facilities">All Facilities</Link>
          </li>

          <li>
            <Link to="/my-bookings">My Bookings</Link>
          </li>

          <li>
            <Link to="/add-facility">Add Facility</Link>
          </li>

          <li>
            <Link to="/manage-facilities">Manage Facilities</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
