export interface IResponse<T> {
  response_schema: ResponseSchema;
  response_output: T extends object
    ? ResponseObjectOutput<T>
    : ResponseListOutput<T>;
}

interface ResponseSchema {
  response_code: string;
  response_message: string;
}

interface ResponseObjectOutput<T> {
  detail: T;
}
interface ResponseListOutput<T> {
  list: List<T>;
}

interface List<T> {
  pagination?: Pagination | null;
  content: T[];
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
