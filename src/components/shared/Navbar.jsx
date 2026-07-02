import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

function Navbar() {
  const { isPending } = useAuth();
const { user } = useAuth();

// console.log(user)
async function handleLogout() {
  try {
    await signOut(auth);
    toast.success("Logged out!");
  } catch (err) {
    console.log(err);
  }
}

  if (isPending) {
    return (
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-primary">
            SportNest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Left */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">
          SportNest
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/facilities">All Facilities</Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="User"
                />
              </div>
            </div>
              <p className="font-bold">click on the profile image to navigate further</p>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-64"
            >
              <li className="pointer-events-none mb-2">
                <span className="font-bold text-base">
                  {user.displayName || "User"}
                </span>

                <span className="text-xs opacity-70">
                  {user.email}
                </span>
              </li>

              <div className="divider my-1"></div>

              <li>
                <Link to="/my-bookings">
                  My Bookings
                </Link>
              </li>

              <li>
                <Link to="/add-facility">
                  Add Facility
                </Link>
              </li>

              <li>
                <Link to="/manage-facilities">
                  Manage Facilities
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline btn-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary btn-sm"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;