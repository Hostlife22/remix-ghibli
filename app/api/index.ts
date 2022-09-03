export function get<T>(url: string): Promise<T> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw res;
    }

    return res.json() as T;
  });
}

export function post<T, D>(url: string, data: D): Promise<T> {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }

    return res.json() as T;
  });
}
