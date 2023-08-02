const parseOptions = (url: string): FunctionalityOptions => {
  const query = new URL(url).searchParams;

  const DEFAULTPAGE = 1;
  const DEFAULTLIMIT = 30;

  const search = query.get("search") ?? "";
  const sortOrder = (query.get("sortOrder") as SortOptions) ?? "asc";
  const sortBy = (query.get("sortBy") as SortByOptions) ?? "name";
  const page = +(query.get("page") ?? DEFAULTPAGE);
  const limit = +(query.get("limit") ?? DEFAULTLIMIT);

  return {
    search,
    sortOrder,
    sortBy,
    page,
    limit,
  };
};

export default parseOptions;
