import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const LoginView = ({ onLogin }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetState = () => {
    setError(null);
    setSuccess(null);
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const switchTab = (t) => {
    setTab(t);
    resetState();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onLogin?.();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setSuccess("Account created!");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#060810] flex items-center justify-center px-4 py-20 relative overflow-hidden">

      <div className="grain-overlay" aria-hidden="true" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,200,255,0.04)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,200,255,0.03)_0%,transparent_70%)]" />

      <div className="w-full max-w-[440px] relative z-10">

        {/* Wordmark */}
        <div className="text-center mb-10">
          <div className="font-['Bebas_Neue'] text-[32px] tracking-[0.08em] text-[#ddeeff] leading-none mb-2">
            Aud<span className="text-cyan-400">ex</span>
          </div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-cyan-400/60 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-cyan-400/40" />
            Music Discovery Platform
            <span className="w-8 h-px bg-cyan-400/40" />
          </div>
        </div>

        {/* Card */}
        <div className="relative border border-cyan-400/10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Tabs */}
          <div className="flex border-b border-cyan-400/10">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`
                  flex-1 py-4  text-[11px] tracking-[0.15em] uppercase
                  transition-colors duration-150 relative
                  ${tab === t
                    ? "text-cyan-400 bg-cyan-400/[0.04]"
                    : "text-[#ddeeff]/30 hover:text-[#ddeeff]/60"
                  }
                `}
              >
                {t}
                {tab === t && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-cyan-400 shadow-[0_0_6px_rgba(0,200,255,0.5)]" />
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="p-8 bg-[#060810]">
            <form onSubmit={tab === "login" ? handleLogin : handleRegister} noValidate>
              <div className="flex flex-col gap-5">

                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  required
                />

                <Field
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder={tab === "register" ? "Min. 6 characters" : "••••••••"}
                  required
                />

                {tab === "register" && (
                  <Field
                    label="Confirm Password"
                    type="password"
                    value={confirm}
                    onChange={setConfirm}
                    placeholder="••••••••"
                    required
                  />
                )}

                {error && (
                  <div className="px-4 py-3  text-[11px] tracking-[0.06em] text-red-400 border border-red-400/20 bg-red-400/5">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="px-4 py-3  text-[11px] tracking-[0.06em] text-cyan-400 leading-relaxed border border-cyan-400/20 bg-cyan-400/5">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 py-4  text-[13px] tracking-[0.1em] uppercase font-medium transition-all duration-200 bg-cyan-400 text-[#060810] disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1a4a6a]"
                >
                  {loading ? "Please wait..." : tab === "login" ? "Login" : "Create Account"}
                </button>

                <p className="text-center  text-[11px] tracking-[0.06em] text-[#ddeeff]/25">
                  {tab === "login" ? "No account? " : "Already have one? "}
                  <button
                    type="button"
                    onClick={() => switchTab(tab === "login" ? "register" : "login")}
                    className="text-cyan-400/70 hover:text-cyan-400 transition-colors duration-150 bg-transparent border-0 cursor-pointer  text-[11px] tracking-[0.06em]"
                  >
                    {tab === "login" ? "Register" : "Login"}
                  </button>
                </p>

              </div>
            </form>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className=" text-[11px] tracking-[0.1em] uppercase text-[#ddeeff]/20 hover:text-[#ddeeff]/50 transition-colors duration-150 bg-transparent border-0 cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

const Field = ({ label, type, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-2">
    <label className=" text-[11px] tracking-[0.12em] uppercase text-[#ddeeff]/45">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 bg-[#090e1a]  text-[13px] text-[#ddeeff] placeholder:text-[#ddeeff]/20 outline-none transition-all duration-150 border border-white/10 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
    />
  </div>
);

export default LoginView;