import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Modal } from '../../components/Modal';
import { Container, TableContainer } from './styles';
import { FiTrash2, FiEdit3, FiArrowLeft } from "react-icons/fi";
import { Button } from '../../components/Button';
import { ModalAdicionarCausa } from '../../components/ModalAdicionarCausa';

export function Causas() {
  const [casos, setCasos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCaso, setSelectedCaso] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [casoToDelete, setCasoToDelete] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchCasos = async () => {
        try {
          const response = await api.get("/casos");
          setCasos(response.data);
        } catch (error) {
          alert("Erro ao carregar os casos!");
        }
      };

      fetchCasos();
    }
  }, [user, navigate]);

  const handleOpenModal = (type, caso = null) => {
    setModalType(type);
    setSelectedCaso(caso);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCaso(null);
  };

  const handleUpdateCasos = async () => {
    try {
      const response = await api.get("/casos");
      setCasos(response.data);
    } catch (error) {
      alert("Erro ao atualizar a lista de casos!");
    }
  };

  const handleDeleteCaso = (casoId) => {
    setCasoToDelete(casoId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCaso = async () => {
    try {
      await api.delete(`/casos/${casoToDelete}`);
      setCasos(prev => prev.filter(caso => caso.id !== casoToDelete));
      alert("Caso excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir o caso!");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <header>
        <button onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Voltar
        </button>
        <h1>Gerencie seus Casos</h1>
      </header>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Cliente</th>
              <th>Cpf Cliente</th>
              <th>Decisão Favorável</th>
              <th>Protocolado nos órgãos</th>
              <th>Baixa SPC</th>
              <th>Baixa Boa Vista</th>
              <th>Baixa Serasa</th>
              <th>Baixa CENPROT</th>
              <th>Baixa QUOD</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {casos.length > 0 ? (
              casos.map((caso) => (
                <tr key={caso.id}>
                  <td>{caso.id}</td>
                  <td>{caso.nome}</td>
                  <td>{caso.cpf}</td>
                  <td>{caso.decisao}</td>
                  <td>{caso.protocolado}</td>
                  <td>{caso.spc}</td>
                  <td>{caso.boa}</td>
                  <td>{caso.serasa}</td>
                  <td>{caso.cenprot}</td>
                  <td>{caso.quod}</td>
                  <td>
                    <button onClick={() => handleOpenModal('Editar', caso)}>
                      <FiEdit3 />
                    </button>
                    <button onClick={() => handleDeleteCaso(caso.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum caso encontrado</td>
              </tr>
            )}
          </tbody>
        </table>

        <Button title="Adicionar Caso" onClick={() => handleOpenModal('Adicionar')} />
      </TableContainer>

      {isModalOpen && (
        <ModalAdicionarCausa
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
            handleUpdateCasos();
          }}
          causa={modalType === "Editar" ? selectedCaso : null}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirmar Exclusão"
          onConfirm={confirmDeleteCaso}
          confirmText="Excluir"
        >
          <p>Tem certeza de que deseja excluir este caso?</p>
        </Modal>
      )}
    </Container>
  );
}
