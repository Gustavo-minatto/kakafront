/* eslint-disable react/prop-types */
import { Modal } from '../Modal';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import ReactInputMask from 'react-input-mask';

export function ModalAdicionarCliente({ isOpen, onClose, cliente }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    if (cliente) {
      setName(cliente.name);
      setCpf(cliente.cpf);
      setEmail(cliente.email);
      setTelefone(cliente.telefone);
      setEndereco(cliente.endereco);
      setBairro(cliente.bairro);
      setCep(cliente.cep);
    }
  }, [cliente]);

  async function handleAddCliente() {
    if (!name || !cpf || !email || !telefone || !endereco || !bairro || !cep) {
      return alert("Preencha todos os campos");
    }

    try {
      if (cliente) {
        await api.put(`/clientes/${cliente.id}`, {
          name,
          cpf,
          email,
          telefone,
          endereco,
          bairro,
          cep
        });
        alert("Cliente atualizado com sucesso!");
      } else {
        await api.post("clientes", {
          name,
          cpf,
          email,
          telefone,
          endereco,
          bairro,
          cep
        });
        alert("Cliente criado com sucesso!");
      }
      onClose();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Erro ao cadastrar ou atualizar cliente. Tente novamente.");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={cliente ? "Editar Cliente" : "Adicionar Cliente"} onConfirm={handleAddCliente}>
      <form>
        <label>Nome do Cliente</label>
        <input
          type="text"
          name="nome"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ex: José da Silva"
        />

        <label>CPF</label>
        <ReactInputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          name="cpf"
          placeholder="Ex: 123.456.789-10"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ex: email@email.com"
        />

        <label>Telefone</label>
        <ReactInputMask
          mask="(99) 99999-9999"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          name="telefone"
          placeholder="Ex: (12) 34567-8910"
        />

        <label>Endereço</label>
        <input
          type="text"
          name="endereco"
          value={endereco}
          onChange={e => setEndereco(e.target.value)}
          placeholder="Ex: Rua Jair Martins Mil Homens"
        />

        <label>Bairro</label>
        <input
          type="text"
          name="bairro"
          value={bairro}
          onChange={e => setBairro(e.target.value)}
          placeholder="Ex: Centro"
        />

        <label>CEP</label>
        <ReactInputMask
          mask="99999-999"
          value={cep}
          onChange={e => setCep(e.target.value)}
          name="cep"
          placeholder="Ex: 15000-001"
        />
      </form>
    </Modal>
  );
}
