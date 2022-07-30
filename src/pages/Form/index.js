import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";
// import {useNavigate} from 'react-router-dom';
import FormLogo from "../../assets/form-altice.png";
import api from '../../services/api';
import "../../App.css";


let axiosConfig = {
  headers: {
      'Content-Type': 'application/json; charset=utf-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const today = new Date();
const schema = yup
  .object({
    nome: yup
      .string()
      .required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    nif: yup
      .string()
      .min(8, "O nif deve ter 8 caracteres")
      .max(8, "O nif deve ter 8 caracteres")
      .required("O nif é obrigatório"),
    morada: yup
      .string()
      .required("Morada é obrigatório"),
    dataNascimento: yup
      .date().transform(parseDateString).max(today)
      .required("Data de nascimento é obrigatório"),
    })
  .required();

  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
  }

  function createPost(data) {
    api
      .post("/form/new-form",data, axiosConfig)
      .then((response) => {
        return true;
      })
      .catch((response) =>{
        return false;
      });
  }

function Form() {
  //Navigate -> encaminharia para outra pagina (não necessario para o projeto) -- reload page -- 
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(userData) {
    if(!createPost(userData)){
      alert('Dados enviados com sucesso!')
      window.location.reload();
    }else{
      alert('Algo deu errado =(')
    }
      
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt="imagem-logo" />

      <label>
        Nome
        <input type="text" {...register("nome", { required: true })} />
        <span>{errors.nome?.message}</span>
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

      <label>
        Data de Nascimento
        <input type="date" required  min={"1800-01-01"} max={"2020-01-01"} {...register("dataNascimento")} />
        <span>{errors.dataNascimento?.message}</span>
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;
