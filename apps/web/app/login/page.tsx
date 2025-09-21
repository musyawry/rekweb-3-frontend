"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [akun, setAkun] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ akun, password }),
      credentials: "include",
    });
    if (res.redirected) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login gagal");
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Login Admin</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Akun</label>
          <input
            value={akun}
            onChange={(e) => setAkun(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <button
          type="submit"
          style={{ padding: "8px 16px", fontWeight: "bold" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
