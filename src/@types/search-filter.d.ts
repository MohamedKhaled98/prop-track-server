export default interface SearchFilter {
  filter?: {
    [key: string]: string | number | boolean | string[] | number[];
  };
  page?: number;
  limit?: number;
  sortOrder?: "ASC" | "DESC";
  sortBy?: string | string[];
}
