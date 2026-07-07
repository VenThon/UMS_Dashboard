// export async function apiFetcher<T>(
//   input: RequestInfo,
//   init?: RequestInit,
// ): Promise<T> {
//   const response = await fetch(input, init);

//   const text = await response.text();

//   const data = text ? JSON.parse(text) : null;

//   if (!response.ok) {
//     throw new Error(data?.message || data?.error || "Something went wrong");
//   }

//   return data as T;
// }
export async function apiFetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.message ||
      data?.error ||
      "Something went wrong.";

    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message),
    );
  }

  return data;
}
