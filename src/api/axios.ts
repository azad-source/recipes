import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://83.136.233.139:3000/api/recipe';

const api = axios.create({
  baseURL,
  paramsSerializer: {
    serialize: buildSearchString,
    indexes: false,
  },
});

export const retrieveData = <T>(res: AxiosResponse<T>): T => res.data;

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
