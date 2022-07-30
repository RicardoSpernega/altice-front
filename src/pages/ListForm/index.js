import React, { useEffect, useState } from "react";
import api from '../../services/api';
// import './styles.css';

export default function ListForm() {
  const [forms, setforms] = useState([]);
  useEffect(() => {
    api.get("/form")
       .then((response) => {
         console.log(response);
         setforms(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }, []);
  return (
    <div className="form-container">
       <h1>Relação de Formulario</h1>
        <ul>
           {forms.map(form => (
             <li key={form.formId}>
                <b>Nome:</b>{form.nome}<br/>
                <b>Email:</b>{form.email}<br/>
                <b>Nif:</b>{form.nif}<br/>
            </li>
         ))}
        </ul>
    </div>
  );
}