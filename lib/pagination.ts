export function getPagination(page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 100);

  return {
    page: safePage,
    pageSize: safePageSize,
    limit: safePageSize,
    offset: (safePage - 1) * safePageSize,
  };
}

export function createPaginationResult<T>({
  data,
  page,
  pageSize,
  totalItems,
}: {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
}) {
  return {
    data,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      hasNextPage: page * pageSize < totalItems,
      hasPreviousPage: page > 1,
    },
  };
}
