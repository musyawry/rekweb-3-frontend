"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardAdmin() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    fakultas: "",
    prodi: "",
    angkatan: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // Cek login (token di cookie)
  useEffect(() => {
    // Bisa tambahkan pengecekan token di cookie di sini
    // Jika tidak ada token, redirect ke landing page
    // (Untuk demo, abaikan dulu)
  }, []);

  // Ambil data mahasiswa
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // Handler logout
  const handleLogout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  };

  const fetchMahasiswa = async () => {
    const res = await fetch("http://localhost:3001/mahasiswa", {
      credentials: "include",
    });
    const data = await res.json();
    setMahasiswa(data);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    let res;
    if (editId) {
      res = await fetch(`http://localhost:3001/mahasiswa/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
    } else {
      res = await fetch("http://localhost:3001/mahasiswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
    }
    if (res.ok) {
      setForm({ nim: "", nama: "", fakultas: "", prodi: "", angkatan: "" });
      setEditId(null);
      fetchMahasiswa();
    } else {
      setError("Gagal menyimpan data");
    }
  };

  const handleEdit = (m: any) => {
    setForm({
      nim: m.nim,
      nama: m.nama,
      fakultas: m.fakultas,
      prodi: m.prodi,
      angkatan: m.angkatan,
    });
    setEditId(m.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data?")) return;
    const res = await fetch(`http://localhost:3001/mahasiswa/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) fetchMahasiswa();
  };

  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          style={{ padding: "8px 16px", fontWeight: "bold" }}
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, marginBottom: 32 }}>
        <div style={{ marginBottom: 8 }}>
          <label>NIM</label>
          <input
            name="nim"
            value={form.nim}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Fakultas</label>
          <input
            name="fakultas"
            value={form.fakultas}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Prodi</label>
          <input
            name="prodi"
            value={form.prodi}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Angkatan</label>
          <input
            name="angkatan"
            value={form.angkatan}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button
          type="submit"
          style={{ padding: "8px 16px", fontWeight: "bold" }}
        >
          {editId ? "Update" : "Tambah"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                nim: "",
                nama: "",
                fakultas: "",
                prodi: "",
                angkatan: "",
              });
            }}
            style={{ marginLeft: 8 }}
          >
            Batal Edit
          </button>
        )}
      </form>
      <table border={1} cellPadding={8} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Fakultas</th>
            <th>Prodi</th>
            <th>Angkatan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((m: any) => (
            <tr key={m.id}>
              <td>{m.nim}</td>
              <td>{m.nama}</td>
              <td>{m.fakultas}</td>
              <td>{m.prodi}</td>
              <td>{m.angkatan}</td>
              <td>
                <button
                  onClick={() => handleEdit(m)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  style={{ color: "red" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
