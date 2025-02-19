import apiClient from "../utils/apiClient";
import { ITransactionService } from "./ITransactionService";
import { ITransaction } from "../interfaces/ITransaction";
import { Result } from "./Result";

class TransactionService implements ITransactionService {
  async getTransactions(): Promise<Result> {
    try {
      const response = await apiClient.get<Result>("/Transaction");
      return response.data;
    } catch (error) {
      return { success: false, message: "Error obteniendo transacciones" };
    }
  }

  // ✅ Nuevo método para crear una transacción
  async createTransaction(transaction: ITransaction): Promise<Result> {
    try {
      const response = await apiClient.post<Result>("/Transaction", transaction);
      return response.data;
    } catch (error) {
      return { success: false, message: "Error agregando transacción" };
    }
  }
}

export default TransactionService;
