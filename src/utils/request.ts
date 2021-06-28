async function getRequest<T>(endpoint: string): Promise<T> {
  return await fetch(endpoint).then((res) => res.json());
}

export default getRequest;
