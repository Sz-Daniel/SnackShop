import { Link } from 'react-router-dom';

// pages/ServerDown.tsx
export function ServerDown() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Server not available</h1>
      <p>Please try again later</p>
      <Link to="/">Back</Link>
    </div>
  );
}
