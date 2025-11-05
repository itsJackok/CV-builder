const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function api(path, { method = 'GET', body, credentials = 'include' } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials,
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
}
