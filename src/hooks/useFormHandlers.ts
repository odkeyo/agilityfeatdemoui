import { useCallback } from "react";
import { ChangeEvent, useState } from "react";

//Hook reutilizable para manejar cambios en cajas de texto y select
export function useFormHandlers<T>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const handleTextChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return { formState, setFormState, handleTextChange, handleSelectChange };
}
