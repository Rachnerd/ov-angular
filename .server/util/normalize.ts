export interface Normalized<T extends { id: string | number }> {
  byId: { [id: string]: T };
  allIds: string[];
}

export const normalize = <T extends { id: string | number }>(
  collection: T[]
): Normalized<T> =>
  collection.reduce(
    ({ byId, allIds }, value) => ({
      byId: {
        ...byId,
        [value.id]: value,
      },
      allIds: [...allIds, value.id],
    }),
    { byId: {}, allIds: [] }
  );
