const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Only set application/json if Content-Type isn't already explicitly set (or deleted for FormData)
  if (!('Content-Type' in headers) && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.error?.message || errorData.message || response.statusText;
    } catch (e) {
      errorMsg = response.statusText;
    }
    
    if (response.status === 401 && typeof window !== 'undefined') {
      // Clear token and redirect if unauthorized
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // window.location.href = '/login'; // Optional: handled by protected routes
    }
    
    throw new Error(errorMsg);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const apiClient = {
  get: (url: string) => fetchWithAuth(url, { method: 'GET' }),
  post: (url: string, body?: any) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(body) }),
  postForm: (url: string, body: FormData, options?: RequestInit) => {
    // When sending FormData, the browser sets the correct Content-Type (with boundary)
    // We must NOT set Content-Type manually for FormData.
    const headers = options?.headers ? { ...options.headers } : {};
    if ('Content-Type' in headers) {
        delete (headers as any)['Content-Type'];
    }
    return fetchWithAuth(url, { ...options, method: 'POST', body, headers });
  },
  put: (url: string, body?: any) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (url: string, body?: any) => fetchWithAuth(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (url: string) => fetchWithAuth(url, { method: 'DELETE' }),
};
