import React, { useState } from "react";
import { Typography, TextField, Button, Card, CardContent, Box, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import TransactionService from "../services/TransactionService";
import { ITransaction } from "../interfaces/ITransaction";

const MaintenancePage: React.FC = () => {
  const transactionService = new TransactionService();

  // ✅ Estado inicial del formulario
  const [transaction, setTransaction] = useState<ITransaction>({
    id: 0,
    amount: 0,
    type: "",
    date: new Date().toISOString(),
    description: "",
  });

  // ✅ Manejar cambios en los inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  // ✅ Enviar datos a la API
  const handleSubmit = async () => {
    if (!transaction.amount || !transaction.type || !transaction.description) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const result = await transactionService.createTransaction(transaction);
      if (result.success) {
        toast.success("¡Transacción agregada correctamente!");
        setTransaction({ id: 0, amount: 0, type: "", date: new Date().toISOString(), description: "" }); // Reset formulario
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

      {/* Card con formulario */}
      <Card sx={{ width: "80%", maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Agregar Nueva Transacción
          </Typography>

          {/* Campo Monto */}
          <TextField
            label="Monto"
            name="amount"
            type="number"
            fullWidth
            value={transaction.amount}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Campo Tipo (Ingreso/Gasto) */}
          <TextField
            select
            label="Tipo"
            name="type"
            fullWidth
            value={transaction.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Ingreso">Ingreso</MenuItem>
            <MenuItem value="Gasto">Gasto</MenuItem>
          </TextField>

          {/* Campo Fecha */}
          <TextField
            label="Fecha"
            name="date"
            type="datetime-local"
            fullWidth
            value={transaction.date}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Campo Descripción */}
          <TextField
            label="Descripción"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={transaction.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Botón Guardar */}
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Guardar Transacción
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MaintenancePage;
