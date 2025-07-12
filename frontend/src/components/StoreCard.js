function StoreCard({ store }) {
  return (
    <div className="store-card">
      <h3>{store.name}</h3>
      <p>{store.email}</p>
      <p>{store.address}</p>
    </div>
  );
}

export default StoreCard;