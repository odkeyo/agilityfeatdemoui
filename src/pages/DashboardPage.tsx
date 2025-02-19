import React, { useEffect, useState, useRef } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import TransactionService from "../services/TransactionService";
import { ITransaction } from "../interfaces/ITransaction";

const DashboardPage: React.FC = () => {
  const transactionService = new TransactionService();
  const [rows, setRows] = useState<ITransaction[]>([]); // ✅ Se define el tipo de datos
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  // ✅ Definir columnas del DataGrid con tipos correctos
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "amount", headerName: "Monto", width: 120, type: "number" },
    { field: "type", headerName: "Tipo", width: 150 },
    { field: "date", headerName: "Fecha", width: 180 },
    { field: "description", headerName: "Descripción", width: 300 },
  ];

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchTransactions = async () => {
      const result = await transactionService.getTransactions();

      if (!result.success) {
        toast.warn(result.message);
      } else {
        // ✅ Especificamos el tipo `ITransaction` en `map()`
        const formattedData: ITransaction[] = result.data.map((transaction: ITransaction) => ({
          ...transaction,
          date: new Date(transaction.date).toLocaleString(),
        }));

        setRows(formattedData);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [transactionService]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
      {/* Título */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Resumen de Transacciones
      </Typography>

      {/* Card centrada con DataGrid */}
      <Card sx={{ width: "80%", maxWidth: 800, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Historial de Transacciones
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid 
              rows={rows} 
              columns={columns} 
              loading={loading} 
              pageSizeOptions={[5, 10]} 
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
