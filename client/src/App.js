import './App.css';
import React, { useState } from 'react';
import Axios from "axios";
import InputMask from 'react-input-mask';
import ListaClientes from "./components/listar_clientes/listar.js";
import ListarAgendamentos from './components/listar_clientes/listar-agendamentos.js';
import CadastroAgendamentos from './components/listar_clientes/cadastroagendamentos.js';

// Defina o componente Cadastro Cliente.
function CadastroCliente() {
  // Defina os estados iniciais para 'values', 'nome' e 'telefone'.
  const [values, setValues] = useState({ nome: '', telefone: '' });
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  // Exiba no console os valores do estado 'values'.
  console.log(values);

  // Função para manipular a mudança nos campos de entrada e atualizar o estado 'values'.
  const handleChangeValues = (value) => {
    // Use a função de atualização do estado para garantir que os valores antigos sejam preservados.
    setValues(prevValue => ({
      ...prevValue, // Mantém os valores antigos do objeto.
      [value.target.name]: value.target.value, // Atualiza o campo correspondente com o novo valor.
    }))
  };

  // Função para lidar com o clique no botão de cadastro.
  const handleClickButton = () => {
    // Faça uma solicitação POST para a URL especificada com os dados do aluno.
    Axios.post("http://localhost:3001/register", {
      nome: values.nome,
      telefone: values.telefone
    }).then((response) => {
      console.log(response); // Exiba a resposta da solicitação no console.
    })
  }

  // Renderize o formulário de cadastro de cliente.
  return (
    <div className="container mt-5">
      <CadastroAgendamentos/>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Cadastro de Clientes</h2>
          <form onSubmit={handleClickButton}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name='nome'
                onChange={handleChangeValues}
              />
            </div>
            <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            className="form-control"
            id="telefone"
            name="telefone"
            onChange={handleChangeValues}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      {/* Renderize o componente ListaClientes para exibir a lista de clientes cadastrados. */}
      <ListarAgendamentos/>
      <ListaClientes/>
    </div>
  );
}

// Exporte o componente CadastroAluno para uso em outros lugares.
export default CadastroCliente;