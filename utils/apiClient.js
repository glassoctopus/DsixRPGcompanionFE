const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper to get CSRF token from cookie (needed for POST, PUT, PATCH, DELETE)
function getCsrfToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Generic fetch wrapper with session cookies (no JWT)
async function sessionFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || 'GET';

  // For mutating methods, add CSRF token header (if available)
  const headers = { ...options.headers };
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // send session cookie
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
}

// Convenience methods
export const apiClient = {
  async get(endpoint, options = {}) {
    const response = await sessionFetch(endpoint, { method: 'GET', ...options });
    return response.json();
  },

  async post(endpoint, data, options = {}) {
    const response = await sessionFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    return response.json();
  },

  async put(endpoint, data, options = {}) {
    const response = await sessionFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    return response.json();
  },

  async patch(endpoint, data, options = {}) {
    const response = await sessionFetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    return response.json();
  },

  async delete(endpoint, options = {}) {
    const response = await sessionFetch(endpoint, { method: 'DELETE', ...options });
    return response.json();
  },
};

export default apiClient;
