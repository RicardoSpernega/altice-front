import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormLogo from "./assets/form-altice.png";
import api from './services/api';
import "./App.css";


const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    nif: yup
      .string()
      .min(8, "O nif deve ter 8 caracteres")
      .required("O nif é obrigatório"),
    morada: yup
      .string()
      .required("Morada é obrigatório"),
    })
  .required();

function App() {
  useEffect(() => {
    api.get("/form")
       .then((response) => {
         console.log(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
    });},[]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(userData) {
    console.log(userData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt="imagem-logo" />

      <label>
        Nome
        <input type="text" {...register("name", { required: true })} />
        <span>{errors.name?.message}</span>
      </label>

      <label>
        Email
        <input type="text" {...register("email")} />
        <span>{errors.email?.message}</span>
      </label>

      <label>
        NIF
        <input type="text" {...register("nif")} />
        <span>{errors.nif?.message}</span>
      </label>

      <label>
        Morada
        <input type="text" {...register("morada")} />
        <span>{errors.morada?.message}</span>
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
