import { TMDB_BASE_URL, TMDB_API_KEY } from 'src/common/constant';

class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async fetch<T>(
    endpoint: string,
    options: RequestInit & { queryParam?: Record<string, any> } = {},
  ): Promise<T> {
    const { queryParam, ...fetchOptions } = options;
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

    url.searchParams.append('api_key', TMDB_API_KEY);

    if (queryParam) {
      Object.entries(queryParam).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response: Response = await window.fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.status_message || `API request failed: ${response.status}`,
      );
    }

    return response.json();
  }
}

const instance = ApiClient.getInstance();
export const fetch = instance.fetch.bind(instance);
