import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.config";

export default function Register() {


  const navigate = useNavigate();

const [form, setForm] = useState({
  name: "",
  photo: "",
  email: "",
  password: "",
});

  const [loading, setLoading] = useState(false);

function handleChange(e) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    await updateProfile(result.user, {
      displayName: form.name,
      photoURL: form.photo,
    });

    toast.success("Account created!");

    navigate("/");
  } catch (err) {
  switch (err.code) {
    case "auth/email-already-in-use":
      toast.error("Email already exists.");
      break;

    case "auth/weak-password":
      toast.error("Password should be at least 6 characters.");
      break;

    default:
      toast.error("Registration failed.");
  }
}

  setLoading(false);
}

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
<input
  type="text"
  name="name"
  placeholder="Full Name"
  onChange={handleChange}
/>

<input
  type="email"
  name="email"
  placeholder="Email"
  onChange={handleChange}
/>

<input
  type="text"
  name="photo"
  placeholder="Photo URL"
  onChange={handleChange}
/>
<input
  type="password"
  name="password"
  placeholder="Password"
  onChange={handleChange}
/>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
            <div className="divider">OR</div>
          </form>

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-primary ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
