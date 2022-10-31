import axios from 'axios';

const baseURL = '/api/v1';

const api = axios.create({
  baseURL,
  paramsSerializer: {
    serialize: buildSearchString,
    indexes: false,
  },
});

export function buildSearchString(params: Record<string, any>): string {
  const pairs: string[] = [];
  Object.keys(params).forEach((k) => {
    const key = encodeURIComponent(k);
    const value = params[key];

    if (value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      pairs.push(
        value
          .map((v) => `${key}=${encodeURIComponent(v !== undefined ? String(v) : '')}`)
          .join('&'),
      );
    } else {
      pairs.push(`${key}=${encodeURIComponent(String(value))}`);
    }
  });
  return pairs.join('&');
}

export { api };
