'use client';
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [ping, setPing] = useState<string | null>(null);

  async function hentPing() {
    const res = await fetch('/api/ping');
    const data = await res.json();
    setPing(`${data.message} @ ${new Date(data.time).toLocaleTimeString()}`);
  }

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui, Arial' }}>
      <h1>Hei, Nils 👋</h1>
      <p>Dette er din første egen Next.js-side.</p>

      <div style={{ marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12 }}>
        <p style={{ marginBottom: 8 }}>Demo-knapp:</p>
        <button
          onClick={() => setCount((x) => x + 1)}
          style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #ddd', cursor: 'pointer' }}
        >
          Klikk meg ({count})
        </button>
      </div>

      <div style={{ marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 12 }}>
        <p style={{ marginBottom: 8 }}>Kall server‑API:</p>
        <button
          onClick={hentPing}
          style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #ddd', cursor: 'pointer' }}
        >
          Ping server
        </button>
        {ping && <p style={{ marginTop: 12 }}>Svar: {ping}</p>}
      </div>
    </main>
  );
}