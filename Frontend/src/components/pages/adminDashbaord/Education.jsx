import React, { useEffect, useState } from 'react';
import CauseCard from '../../causes/CauseCard';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api.config';

const Education = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.GET_ALL);
        setCauses(res.data.filter(cause => cause.type === 'education'));
      } catch (err) {
        setError('Failed to load causes');
      } finally {
        setLoading(false);
      }
    };
    fetchCauses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Education Causes</h2>
      <div>
        {causes.length === 0 ? (
          <div>No education causes found.</div>
        ) : (
          causes.map(cause => (
            <CauseCard key={cause._id} cause={cause} />
          ))
        )}
      </div>
    </div>
  );
};

export default Education; 