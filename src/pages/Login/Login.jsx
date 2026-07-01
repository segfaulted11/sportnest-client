import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { signIn } from "../../lib/auth-client";

export default function Login() {
  async function handleGoogleLogin() {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
      newUserCallbackURL: "/",
      errorCallbackURL: "/login",
    });
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

    await signIn.email(
      {
        email: form.email,
        password: form.password,
      },
      {
        onSuccess() {
          toast.success("Welcome back!");

          navigate(from, {
            replace: true,
          });
        },

        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    );

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
