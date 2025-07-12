import { useState } from 'react';
import api from '../api/api';

function RatingForm({ storeId, currentRating }) {
  const [rating, setRating] = useState(currentRating || 1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ratings', { storeId, value: rating });
      setSubmitted(true);
    } catch (err) {
      console.error('Rating submission failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rate this store:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>
      <button type="submit">Submit</button>
      {submitted && <p>✅ Rating submitted!</p>}
    </form>
  );
}

export default RatingForm;
