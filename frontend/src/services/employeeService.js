import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees'; // Assuming your backend runs on port 5000

const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getEmployeeAssets = async (employeeId) => {
  const response = await axios.get(`${API_URL}/${employeeId}/assets`);
  return response.data;
};

export default {
  getEmployees,
  getEmployeeAssets,
};
