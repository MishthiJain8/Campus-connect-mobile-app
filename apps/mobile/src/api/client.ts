const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

export async function apiRequest(path: string, method = 'GET', body?: unknown, token?: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(json?.error || 'Request failed');
  }

  return json;
}
