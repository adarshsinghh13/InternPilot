import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(form.email, form.password);
      setUser(data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#222222] bg-[#111111] p-8 shadow-2xl shadow-black/30">
        <div className="mb-6">
          <h1 className="font-['Sora',_sans-serif] text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to continue tracking your applications.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#4f46e5] px-4 py-2 font-medium text-white transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          No account yet?{' '}
          <Link to="/register" className="text-[#818cf8] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
