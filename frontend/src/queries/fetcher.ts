export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)));
