import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [summary, setSummary] = useState({
    totalRequests: 0,
    openRequests: 0,
    inProgressRequests: 0,
    resolvedRequests: 0,
    closedRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const API_BASE_URL = 'http://localhost:5000/api/issues';

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          searchTerm,
          statusFilter: statusFilter === 'All' ? '' : statusFilter,
        };
        const requestsRes = await axios.get(API_BASE_URL, { params });
        setRequests(requestsRes.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to fetch requests.');
      }
    };

    const fetchSummary = async () => {
      try {
        const summaryRes = await axios.get(`${API_BASE_URL}/summary`);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error('Error fetching request summary:', err);
        // Don't set global error for summary, just log
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
    fetchSummary();
  }, [searchTerm, statusFilter]);

  return {
    requests,
    summary,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
  };
};

export default useRequests;
