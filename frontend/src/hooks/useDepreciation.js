import { useState, useEffect } from 'react';
import axios from 'axios';

const useDepreciation = () => {
  const [summary, setSummary] = useState({
    totalPurchaseCost: 0,
    currentTotalValue: 0,
    totalDepreciation: 0,
  });
  const [details, setDetails] = useState([]);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = 'http://localhost:5000/api/depreciation';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, detailsRes, trendRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/summary`),
          axios.get(`${API_BASE_URL}/details`),
          axios.get(`${API_BASE_URL}/trend`),
        ]);

        setSummary(summaryRes.data);
        setDetails(detailsRes.data);
        setTrend(trendRes.data);
      } catch (err) {
        console.error('Error fetching depreciation data:', err);
        setError('Failed to fetch depreciation data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once on mount

  const filteredDetails = details.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    summary,
    details: filteredDetails,
    trend,
    loading,
    error,
    searchTerm,
    setSearchTerm,
  };
};

export default useDepreciation;
