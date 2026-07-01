import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.config";

export default function Login() {

async function handleGoogleLogin() {
  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    toast.success("Logged in successfully!");

    navigate(from, {
      replace: true,
    });

  } catch (err) {
    console.log(err);
    toast.error("Google login failed.");
  }
}

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);

  try {
    await signInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    toast.success("Welcome back!");

    navigate(from, {
      replace: true,
    });

  } catch (err) {
    console.log(err);

    switch (err.code) {
      case "auth/invalid-credential":
        toast.error("Invalid email or password.");
        break;

      case "auth/user-not-found":
        toast.error("User not found.");
        break;

      default:
        toast.error("Login failed.");
    }
  }

  setLoading(false);
}

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={handleChange}
            />

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="divider">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </button>
          </form>

          <p className="text-center">
            Don't have an account?
            <Link className="text-primary ml-2" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
