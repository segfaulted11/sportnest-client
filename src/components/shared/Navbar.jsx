import { Link } from "react-router-dom";
import useAuth  from "../../hooks/useAuth";
import { signOut } from "../../lib/auth-client";
import toast from "react-hot-toast";

function Navbar() {
  const { data, isPending } = useAuth();

  async function handleLogout() {
    await signOut();

    toast.success("Logged out!");
  }

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
        {data?.user ? (
          <>
            <img src={data.user.image} className="w-10 rounded-full" />

            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
