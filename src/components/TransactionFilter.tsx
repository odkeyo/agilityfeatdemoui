import React, { ChangeEvent } from "react";
import { Card, CardContent, Box, Button, Typography } from "@mui/material";
import { ITransactionFilter } from "../interfaces/ITransactionFilter";
import { renderTextField, renderSelectField } from "../utils/formFieldRenderer";

interface TransactionFilterProps {
  filters: ITransactionFilter;
  onTextChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onApplyFilters: () => void;
  balance: number;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ filters, onTextChange, onSelectChange, onApplyFilters, balance }) => {
  return (
    <Card sx={{ width: "80%", maxWidth: 800, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
          Balance Total
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: balance > 0 ? "green" : balance < 0 ? "red" : "gray",
            mb: 2,
          }}
        >
          ${balance.toFixed(2)}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {renderSelectField("type", "Tipo", [
            { label: "Todos", value: "" },
            { label: "Ingreso", value: "Ingreso" },
            { label: "Gasto", value: "Gasto" },
          ], filters, onSelectChange)}
          {renderTextField("minAmount", "Monto Mínimo", "number", filters, onTextChange)}
          {renderTextField("maxAmount", "Monto Máximo", "number", filters, onTextChange)}
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {renderTextField("startDate", "Fecha Inicio", "date", filters, onTextChange)}
          {renderTextField("endDate", "Fecha Fin", "date", filters, onTextChange)}          
          <Button variant="contained" color="primary" onClick={onApplyFilters} sx={{ height: "100%", whiteSpace: "nowrap" }}>
            Filtrar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionFilter;
