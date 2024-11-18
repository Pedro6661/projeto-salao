import React, { useState, useEffect } from 'react';
import Axios from "axios";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [editedData, setEditedData] = useState({ nome: '', telefone: '' });

  // Obter a lista de clientes ao montar o componente
  useEffect(() => {
    Axios.get("http://localhost:3001/listar")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Função para exclusão de cliente
  const handleExcluirCliente = (clienteId) => {
    Axios.delete(`http://localhost:3001/excluir/${clienteId}`)
      .then((response) => {
        setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== clienteId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para habilitar o modo de edição para um cliente
  const handleEditClick = (cliente) => {
    setEditingCliente(cliente);
    setEditedData({ nome: cliente.nome, telefone: cliente.telefone });
  };

  // Função para salvar a edição do cliente
  const handleSaveClick = () => {
    Axios.put(`http://localhost:3001/editar/${editingCliente.id}`, editedData)
      .then((response) => {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === editingCliente.id ? { ...cliente, ...editedData } : cliente
          )
        );
        setEditingCliente(null);
        setEditedData({ nome: '', telefone: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mt-4">
      <h2>Lista de Clientes</h2>
      <ul className="list-group">
        {clientes.map((cliente, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            <div>
              <strong>Nome:</strong> {cliente.nome}
              <br />
              <strong>Telefone:</strong> {cliente.telefone}
            </div>
            {editingCliente && editingCliente.id === cliente.id ? (
              <div>
                <input
                  type="text"
                  value={editedData.nome}
                  onChange={(e) => setEditedData({ ...editedData, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={editedData.telefone}
                  onChange={(e) => setEditedData({ ...editedData, telefone: e.target.value })}
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

export default ListaClientes;
