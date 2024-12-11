import { Container, TableContainer } from './styles';
import { FiTrash2, FiEdit3, FiArrowLeft } from "react-icons/fi";

import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { ModalAdicionarCliente } from '../../components/ModalAdicionarCliente';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchClientes = async () => {
        try {
          const response = await api.get("/clientes");
          setClientes(response.data);
        } catch (error) {
          alert("Erro ao carregar os clientes!");
        }
      };

      fetchClientes();
    }
  }, [user, navigate]);

  const [clienteToDelete, setClienteToDelete] = useState(null);

  const handleDeleteCliente = async () => {
    if (clienteToDelete) {
      try {
        await api.delete(`/clientes/${clienteToDelete.id}`);

        setClientes((prev) => prev.filter(cliente => cliente.id !== clienteToDelete.id));

        handleCloseModal();
        alert("Cliente excluído com sucesso!");
      } catch (error) {
        alert("Erro ao excluir cliente!");
      }
    }
  };

  const sortClientes = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedClientes = [...clientes].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setClientes(sortedClientes);
    setSortConfig({ key, direction });
  };

  const handleOpenDeleteModal = (cliente) => {
    setClienteToDelete(cliente);
    setModalType('Excluir');
    setIsModalOpen(true);
  };

  const handleOpenModal = (type, process = null) => {
    setModalType(type);
    setSelectedProcess(process);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProcess(null);
    setClienteToDelete(null);
  };

  return (
    <Container>
      <header>
        <button onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Voltar
        </button>
        <h1>Gerencie seus Clientes</h1>
      </header>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th onClick={() => sortClientes('id')}>Id do Cliente</th>
              <th onClick={() => sortClientes('name')}>Nome</th>
              <th onClick={() => sortClientes('cpf')}>CPF</th>
              <th onClick={() => sortClientes('email')}>E-mail</th>
              <th onClick={() => sortClientes('telefone')}>Telefone</th>
              <th onClick={() => sortClientes('endereco')}>Endereço</th>
              <th onClick={() => sortClientes('bairro')}>Bairro</th>
              <th onClick={() => sortClientes('cep')}>CEP</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.name}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.endereco}</td>
                  <td>{cliente.bairro}</td>
                  <td>{cliente.cep}</td>
                  <td>
                    <button onClick={() => handleOpenModal('Editar', cliente)}>
                      <FiEdit3 />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(cliente)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Nenhum cliente encontrado</td>
              </tr>
            )}
          </tbody>
        </table>

        <Button title={"Adicionar Cliente"} onClick={() => handleOpenModal('Adicionar')} />
      </TableContainer>

      {modalType === "Adicionar" && (
        <ModalAdicionarCliente
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onClienteAdicionado={() => {
            setClientes((prev) => [...prev, novoCliente]);
            handleCloseModal();
          }}
        />
      )}

      {modalType === "Editar" && (
        <ModalAdicionarCliente
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cliente={selectedProcess}
          onClienteAdicionado={() => {
            setClientes((prev) =>
              prev.map((cliente) =>
                cliente.id === selectedProcess.id ? selectedProcess : cliente
              )
            );
            handleCloseModal();
          }}
        />
      )}

      <Modal
        isOpen={isModalOpen && modalType === "Excluir"}
        onClose={handleCloseModal}
        title={`Excluir Cliente`}
        onConfirm={handleDeleteCliente}
      >
        {clienteToDelete && (
          <p>Tem certeza que deseja excluir o Cliente {clienteToDelete.name}?</p>
        )}
      </Modal>
    </Container>
  );
}
