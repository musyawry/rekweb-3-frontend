"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/mahasiswa")
      .then((res) => res.json())
      .then((data) => setMahasiswa(data));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 24,
        }}
      >
        <Link href="/login">
          <button style={{ padding: "8px 16px", fontWeight: "bold" }}>
            Login
          </button>
        </Link>
      </header>
      <h1>Data Mahasiswa</h1>
      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", marginTop: 16 }}
      >
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Fakultas</th>
            <th>Prodi</th>
            <th>Angkatan</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
