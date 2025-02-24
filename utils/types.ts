export enum ROLE {
  MODERATOR = "MODERATOR",
  MINTER = "MINTER",
  BURNER = "BURNER",
}

export interface Transaction {
  index: number;
  hash: string;
  blockHash: string;
  blockNumber: number;
  timestamp: string;
  status: string;
  private: boolean;
  from: string;
  to: string;
}

export interface Block {
  number: number;
  hash: number;
  timestamp: string;
  transactionCount: number;
  size: number;
  miner: string;
}

export interface ResponsePagination<TData> {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: TData[];
}

export interface Payload {
  page: number;
  limit: number;
}

export interface PayloadRequest {
  minHeight: string;
  maxHeight: string;
}
