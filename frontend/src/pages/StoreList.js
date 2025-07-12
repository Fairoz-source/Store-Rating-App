import { useEffect, useState } from 'react';
import api from '../api/api';
import StoreCard from '../components/StoreCard';
import RatingForm from '../components/RatingForm';

function StoreList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get('/stores').then((res) => setStores(res.data));
  }, []);

  return (
    <div>
      <h2>Store List</h2>
      {stores.map((store) => (
        <div key={store.id}>
          <StoreCard store={store} />
          <RatingForm storeId={store.id} />
        </div>
      ))}
    </div>
  );
}

export default StoreList;