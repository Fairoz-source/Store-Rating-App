import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, role, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {token && <Link to="/dashboard">Dashboard</Link>}
      {role === 'admin' && <Link to="/admin">Admin Panel</Link>}

      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
