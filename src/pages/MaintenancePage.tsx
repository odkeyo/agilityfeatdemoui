import React from "react";
import { Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import TransactionService from "../services/TransactionService";
import TransactionForm from "../components/TransactionForm";
import { ITransaction } from "../interfaces/ITransaction";

const MaintenancePage: React.FC = () => {
  const transactionService = new TransactionService();

  const handleSubmit = async (transaction: ITransaction, resetForm: () => void) => {
    if (!transaction.amount || !transaction.type || !transaction.description) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const result = await transactionService.createTransaction(transaction);
      if (result.success) {
        toast.success("¡Transacción agregada correctamente!");
        resetForm();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al agregar la transacción.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Mantenimiento de Transacciones
      </Typography>
      <TransactionForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default MaintenancePage;
