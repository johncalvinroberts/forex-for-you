const GET = 'GET';
const POST = 'POST';
const PATCH = 'PATCH';
const DELETE = 'DELETE';

const easyFetch = async ({ url, method, body = {} }) => {
  const headers = {
    'content-type': 'application/json',
    accept: 'application/json, text/plain, */*',
  };

  const options = {
    headers,
    method,
    ...(method !== GET ? { body: JSON.stringify(body) } : null),
  };
  const res = await fetch(url, options);
  const value = await res.json();
  if (!res.ok) {
    throw value;
  } else {
    return value;
  }
};

const http = {
  get: async (url) => easyFetch({ url, method: GET }),
  post: (url, body) => easyFetch({ url, method: POST, body }),
  patch: (url, body) => easyFetch({ url, method: PATCH, body }),
  delete: (url) => easyFetch({ url, method: DELETE }),
};

export default http;
