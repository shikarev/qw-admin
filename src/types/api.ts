export interface ListResponse<T> {
  data: Array<T>;
  pageCount: number;
  total: number;
}