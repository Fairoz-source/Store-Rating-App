import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import RatingForm from '../components/RatingForm';

function Dashboard() {
  const { role } = useAuth();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <p>Your role: {role}</p>

      {/* Admin Panel */}
      {role === 'admin' && data && (
        <div>
          <h3>Admin Overview</h3>
          <p>Total Users: {data.userCount}</p>
          <p>Total Stores: {data.storeCount}</p>
          <p>Total Ratings: {data.ratingCount}</p>
        </div>
      )}

      {/* Store Owner Panel */}
      {role === 'owner' && data && (
        <div>
          <h3>Store Owner Dashboard</h3>
          <p>Store Name: {data.storeName}</p>
          <p>Average Rating: ⭐ {data.avgRating}</p>
          <p>Total Ratings Received: {data.totalRatings}</p>
        </div>
      )}

      {/* User Panel with Store Search + Rating */}
      {role === 'user' && data?.stores && (
        <div>
          <h3>Available Stores</h3>

          <input
            type="text"
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ margin: '10px 0', padding: '8px', width: '300px' }}
          />

          {data.stores
            .filter((store) =>
              store.name.toLowerCase().includes(search.toLowerCase()) ||
              store.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((store) => (
              <div key={store.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <p><strong>{store.name}</strong></p>
                <p>Address: {store.address}</p>
                <p>Average Rating: ⭐ {store.averageRating}</p>
                {/* ✅ Rating Form */}
                <RatingForm storeId={store.id} currentRating={store.userRating || 0} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
