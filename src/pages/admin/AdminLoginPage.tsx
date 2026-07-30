import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getSupabase, isSupabaseConfigured } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";
import { useNoIndex, usePageTitle } from "../../hooks/usePageMeta";
import { LogoMark } from "../../components/icons";

/**
 * Halaman login admin di URL rahasia `/portal-admin` (tidak ditautkan di mana
 * pun di situs publik). Setelah sukses → redirect ke /admin/dashboard.
 * Supabase Auth meng-hash password (bcrypt) di server & punya rate-limit bawaan.
 */
export default function AdminLoginPage() {
  useNoIndex();
  usePageTitle("Portal — Urushalal");

  const { session, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Sudah login → langsung ke dashboard.
  if (!loading && session) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) {
      setError("Database belum dikonfigurasi. Isi env Supabase terlebih dahulu.");
      return;
    }
    setBusy(true);
    setError("");
    const { error } = await sb.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) {
      setError("Email atau password salah.");
      return;
    }
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <LogoMark size={30} />
          Urushalal
        </div>
        <h1>Masuk Admin</h1>
        <p className="admin-login__sub">Area khusus pengelola konten.</p>

        {!isSupabaseConfigured && (
          <p className="admin-login__warn">
            Supabase belum dikonfigurasi. Isi <code>VITE_SUPABASE_URL</code> dan{" "}
            <code>VITE_SUPABASE_ANON_KEY</code>, lalu jalankan schema.sql dan buat
            akun admin.
          </p>
        )}

        <label className="admin-field">
          <span>Email</span>
          <input
            className="field"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            className="field"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="admin-login__err">{error}</p>}

        <button type="submit" className="btn btn--solid" disabled={busy}>
          {busy ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}
