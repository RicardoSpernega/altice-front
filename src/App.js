import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from "./pages/Form/index";
import ListForm from "./pages/ListForm/index";

export default function App() {
   return(
    <BrowserRouter>
    <Routes>
        <Route  path="/" element = { <Form/> }  exact />
        <Route   path="/list-form" element = { <ListForm/> } />
    </Routes>
    </BrowserRouter>
   );
}