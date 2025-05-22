export async function fetchAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Token ${token}` } : {}),
    },
  });
}