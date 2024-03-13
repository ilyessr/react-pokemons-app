export interface ApiResponse<T> {
  message: string;
  data: T;
}

async function sendRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const authToken = localStorage.getItem("authToken");

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const response = await fetch(`${apiUrl}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  throw new Error("Unsupported content type: " + contentType);
}

export default sendRequest;
