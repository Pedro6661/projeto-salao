import React, { useState, useEffect } from 'react';
import Axios from "axios";

function CadastroAgendamentos() {
    // Defina os estados iniciais para 'values', 'nome' e 'telefone'.
    const [values, setValues] = useState({ data_hora: '', duracao: '' });
    const [data_hora, setData_Hora] = useState('');
    const [duracao, setDuracao] = useState('');
  
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
      Axios.post("http://localhost:3001/registerAgendamentos", {
        data_hora: values.data_hora,
        duracao: values.duracao
      }).then((response) => {
        console.log(response); // Exiba a resposta da solicitação no console.
      })
    }

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Cadastro de Agendamentos</h2>
            <form onSubmit={handleClickButton}>
              <div className="form-group">
                <label htmlFor="data_hora">Data & Hora:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="data_hora"
                  name='data_hora'
                  onChange={handleChangeValues}
                  />
              
              </div>
              <div className="form-group">
            <label htmlFor="duracao">Duração:</label>
            <input
              type="time"
              className="form-control"
              id="duracao"
              name="duracao"
              onChange={handleChangeValues}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );

}
export default CadastroAgendamentos;