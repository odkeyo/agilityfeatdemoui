import React, { useCallback, useEffect, useState } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import TransactionService from "../services/TransactionService";
import { ITransaction } from "../interfaces/ITransaction";
import { ITransactionFilter } from "../interfaces/ITransactionFilter";
import TransactionFilter from "../components/TransactionFilter";
import { useFormHandlers } from "../hooks/useFormHandlers";

const DashboardPage: React.FC = () => {
  const transactionService = new TransactionService();
  const [rows, setRows] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { formState: filters, handleTextChange, handleSelectChange } = useFormHandlers<ITransactionFilter>({
    type: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });
  const [balance, setBalance] = useState(0);
  const transactionServiceRef = useState(() => new TransactionService())[0];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "amount", headerName: "Amount", width: 120, type: "number" },
    { field: "type", headerName: "Type", width: 150 },
    { field: "date", headerName: "Date", width: 180 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  const fetchAllTransactions = useCallback(async () => {
    setLoading(true);
    const result = await transactionServiceRef.getTransactions();
    if (!result.success) {
      toast.warn(result.message);
    } else {
      const formattedData: ITransaction[] = result.data.map((transaction: ITransaction) => ({
        ...transaction,
        date: new Date(transaction.date).toLocaleString(),
      }));

      setRows(formattedData);
      calculateBalance(formattedData);
    }
    setLoading(false);
  }, [transactionServiceRef]); 

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const fetchFilteredTransactions = async () => {
    setLoading(true);
    const result = await transactionService.getFilteredTransactions(filters);

    if (!result.success) {
      toast.warn(result.message);
    } else {
      const formattedData: ITransaction[] = result.data.map((transaction: ITransaction) => ({
        ...transaction,
        date: new Date(transaction.date).toLocaleString(),
      }));

      setRows(formattedData);
      calculateBalance(formattedData);
    }
    setLoading(false);
  };

  const calculateBalance = (transactions: ITransaction[]) => {
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  
    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  
    const balance = totalIncome - totalExpense;
    setBalance(balance);
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Transaction Summary
      </Typography>
      <TransactionFilter
        filters={filters}
        onTextChange={handleTextChange}
        onSelectChange={handleSelectChange}
        onApplyFilters={fetchFilteredTransactions}
        balance={balance}
      />
      <Card sx={{ width: "80%", maxWidth: 800, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transaction History
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} loading={loading} pageSizeOptions={[5, 10]} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
