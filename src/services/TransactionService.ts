import apiClient from "../utils/apiClient";
import { ITransactionService } from "./ITransactionService";
import { ITransaction } from "../interfaces/ITransaction";
import { ITransactionFilter } from "../interfaces/ITransactionFilter";
import { Result } from "./Result";

class TransactionService implements ITransactionService {
  async getTransactions(): Promise<Result> {
    try {
      const response = await apiClient.get<Result>("/Transaction");
      return response as unknown as Result;
    } catch (error) {
      return { success: false, message: "Error retrieving transactions." };
    }
  }

  async getFilteredTransactions(filters: ITransactionFilter): Promise<Result> {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await apiClient.get<Result>(`/Transaction/filter?${queryParams.toString()}`);
      return response as unknown as Result;
    } catch (error) {
      return { success: false, message: "Error retrieving filtered transactions." };
    }
  }

  async createTransaction(transaction: ITransaction): Promise<Result> {
    try {
      const response = await apiClient.post<Result>("/Transaction", transaction);
      return response as unknown as Result;
    } catch (error) {
      return { success: false, message: "Error adding transaction." };
    }
  }
}

export default TransactionService;
