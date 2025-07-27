import { Link } from 'react-router-dom';

// pages/ServerDown.tsx
export function ServerDown() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Szerver nem elérhető</h1>
      <p>Kérjük, próbáld meg később újra.</p>
      <Link to="/">Vissza</Link>
    </div>
  );
}
