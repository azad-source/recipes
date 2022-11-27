import axios, { AxiosResponse } from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const domain = isDev ? 'http://localhost:3000' : 'https://azad-source.online';

const baseURL = `${domain}/api/recipe`;

const api = axios.create({
  baseURL,
  paramsSerializer: {
    serialize: buildSearchString,
    indexes: false,
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export function retrieveData<T>(result: AxiosResponse<T>): T {
  return result.data;
}

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
