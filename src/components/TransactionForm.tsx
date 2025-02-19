import React from "react";
import { Button, Card, CardContent } from "@mui/material";
import { ITransaction } from "../interfaces/ITransaction";
import { useFormHandlers } from "../hooks/useFormHandlers";
import { renderTextField, renderSelectField } from "../utils/formFieldRenderer";
import { formatDateTime } from "../utils/dateUtils";


interface TransactionFormProps {
  initialData?: ITransaction;
  onSubmit: (transaction: ITransaction, resetForm: () => void) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ initialData, onSubmit }) => {
  // Definimos la transacción por defecto
  const defaultTransaction: ITransaction = {
    id: 0,
    amount: 0,
    type: "",
    date: formatDateTime(new Date()),
    description: "",
  };  
  
  const { formState: transaction, setFormState: setTransaction, handleTextChange, handleSelectChange } = useFormHandlers<ITransaction>(initialData || defaultTransaction);

  
  const resetForm = () => {
    setTransaction(defaultTransaction);
  };

  
  const handleSubmit = () => {
    onSubmit(transaction, resetForm);
  };

  return (
    <Card sx={{ width: "50%", boxShadow: 3 }}>
      <CardContent>
        {renderTextField("amount", "Monto", "number", transaction, handleTextChange)}
        {renderSelectField("type", "Tipo", [
          { label: "Ingreso", value: "Ingreso" },
          { label: "Gasto", value: "Gasto" },
        ], transaction, handleSelectChange)}
        {renderTextField("date", "Fecha", "date", transaction, handleTextChange)}
        {renderTextField("description", "Descripción", "text", transaction, handleTextChange)}

        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Guardar Transacción
        </Button>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
