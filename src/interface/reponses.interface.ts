export interface IResponse<T> {
  response_schema: IResponseSchema;
  response_output: T extends object
    ? IResponseObjectOutput<T>
    : IResponseListOutput<T>;
}

interface IResponseSchema {
  response_code: string;
  response_message: string;
}

interface IResponseObjectOutput<T> {
  detail?: T;
}
interface IResponseListOutput<T> {
  list: IList<T>;
}

interface IList<T> {
  content?: T[];
  pagination?: Pagination | null;
}

export interface Pagination {
  page: number;
  total: number;
  size: number;
}

/**
 * Enum representing different response types.
 *
 * @remarks
 * - `LIST`: Represents a response containing a list of items.
 * - `DETAIL`: Represents a response containing detailed information about a single item.
 * - `ERROR`: Represents an error response.
 */
export enum ResponseTypes {
  LIST = 'LIST',
  DETAIL = 'DETAIL',
  ERROR = 'ERROR',
}

export interface IResponseJson<T> {
  data?: T | T[] | null;
  pagination?: Pagination | null;
}
