import React, { useState, useEffect } from 'react';
import Axios from "axios";

function ListarAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
  const [editingAgendamentos, setEditingAgendamentos] = useState(null);
  const [editedData, setEditedData] = useState({ data_hora: '', duracao: '' });
    
    useEffect(() => {
        Axios.get("http://localhost:3001/listarAgendamentos")
          .then((response) => {
            setAgendamentos(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const handleExcluirAgendamentos = (AgendamentosId) => {
        Axios.delete(`http://localhost:3001/excluirAgendamentos/${agendamentosId}`)
          .then((response) => {
            setAgendamentos((prevAgendamentos) => prevAgendamentos.filter((agendamentos) => agendamentos.id !== agendamentosId));
          })
          .catch((error) => {
            console.error(error);
          });
      };

      // Função para habilitar o modo de edição para um Agendamentos
  const handleEditClick = (agendamentos) => {
    setEditingAgendamentos(agendamentos);
    setEditedData({ data_hora: agendamentos.data_hora, duracao: agendamentos.duracao });
  };

  const handleSaveClick = () => {
    Axios.put(`http://localhost:3001/editarAgendamentos/${editingAgendamentos.id}`, editedData)
      .then((response) => {
        setClientes((prevAgendamentos) =>
          prevAgendamentos.map((agendamentos) =>
            agendamentos.id === editingAgendamentos.id ? { ...agendamentos, ...editedData } : agendamentos
          )
        );
        setEditingCliente(null);
        setEditedData({ data_hora: '', duracao: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mt-4">
      <h2>Lista de Agendamentos</h2>
      <ul className="list-group">
        {agendamentos.map((agendamentos, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            <div>
              <strong>Data & Hora:</strong> {agendamentos.data_hora}
              <br />
              <strong>Duração:</strong> {agendamentos.duracao}
            </div>
            {editingAgendamentos && editingAgendamentos.id === agendamentos.id ? (
              <div>
                <input
                  type="text"
                  value={editedData.data_hora}
                  onChange={(e) => setEditedData({ ...editedData, data_hora: e.target.value })}
                />
                <input
                  type="text"
                  value={editedData.duracao}
                  onChange={(e) => setEditedData({ ...editedData, duracao: e.target.value })}
                />
                <button className="btn btn-success btn-sm" onClick={handleSaveClick}>
                  Salvar
                </button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(cliente)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleExcluirCliente(cliente.id)}>
                  Excluir
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
    }
    export default ListarAgendamentos;