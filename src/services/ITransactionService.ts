import { Result } from "./Result";
import { ITransaction } from "../interfaces/ITransaction";
import { ITransactionFilter } from "../interfaces/ITransactionFilter";

export interface ITransactionService {
  getTransactions(): Promise<Result>;
  getFilteredTransactions(filters: ITransactionFilter): Promise<Result>;
  createTransaction(transaction: ITransaction): Promise<Result>;
}
