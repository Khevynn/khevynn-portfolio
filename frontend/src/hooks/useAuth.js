import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useAuth = (url) => {
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data) =>
      axios
        .post(url, data, {
          withCredentials: true,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      setStatus({
        success: true,
        message: data.message || "Operation successful.",
      });
    },
    onError: (error) => {
      const axiosError = error;

      setStatus({
        success: false,
        message:
          axiosError?.message === "Network Error"
            ? "Erro de rede. Por favor, tente mais tarde."
            : axiosError?.response?.data?.message ||
              "Ocorreu um erro inesperado.",
      });
    },
  });

  return { mutate, isPending, error, status };
};
