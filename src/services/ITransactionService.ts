import { Result } from "./Result";
import { ITransaction } from "../interfaces/ITransaction";

export interface ITransactionService {
  getTransactions(): Promise<Result>;
  createTransaction(transaction: ITransaction): Promise<Result>;
}
