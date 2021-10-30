interface Paged<T> {
  results: T[];
  page: number;
  size: number;
  totalResults: number;
}

export const paginate = <T>(
  collection: T[],
  page: number,
  size: number
): Paged<T> => {
  return {
    size,
    page,
    results: collection.slice((page - 1) * size, (page - 1) * size + size),
    totalResults: collection.length,
  };
};
