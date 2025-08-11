// src/services/dist/api.js
const API_BASE =
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE)
    || '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const apiPost = async (endpoint, data, token = null) => {
  try {
    const headers = {
      ...defaultHeaders,
      Authorization: `Bearer ${token || 'dummy-token'}`,
    };

    const userStr = localStorage.getItem('user');
    if (userStr) headers['X-User-Data'] = userStr;

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'API error');
    return result;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};
