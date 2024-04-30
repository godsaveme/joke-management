export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
  rating: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  /*totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;*/
}

export interface MyEventTarget extends EventTarget {
  value: string;
 }