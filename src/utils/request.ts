async function getRequest<T>(endpoint: string): Promise<T> {
  const result = await fetch(endpoint).then((res) => res.json());

  return result;
}

export default getRequest;
