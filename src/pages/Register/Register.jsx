import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { signUp } from "../../lib/auth-client";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await signUp.email(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image,
      },
      {
        onSuccess() {
          toast.success("Account created!");
          navigate("/");
        },

        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    );

    setLoading(false);
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="input input-bordered w-full"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />

            <input
              className="input input-bordered w-full"
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
            />

            <input
              className="input input-bordered w-full"
              placeholder="Photo URL"
              name="image"
              onChange={handleChange}
            />

            <input
              className="input input-bordered w-full"
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
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
