import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  return [values, handleInputChange, reset];
};
