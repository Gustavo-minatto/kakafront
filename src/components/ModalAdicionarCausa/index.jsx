/* eslint-disable react/prop-types */
import { Modal } from '../Modal';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import ReactInputMask from 'react-input-mask';

export function ModalAdicionarCausa({ isOpen, onClose, causa }) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [decisao, setDecisao] = useState("");
  const [protocolado, setProtocolado] = useState("");
  const [spc, setSpc] = useState("");
  const [boa, setBoa] = useState("");
  const [serasa, setSerasa] = useState("");
  const [cenprot, setCenprot] = useState("");
  const [quod, setQuod] = useState("");

  useEffect(() => {
    if (causa) {
      setCpf(causa.cpf);
      setNome(causa.nome)
      setDecisao(causa.decisao);
      setProtocolado(causa.protocolado);
      setSpc(causa.spc);
      setBoa(causa.boa);
      setSerasa(causa.serasa);
      setCenprot(causa.cenprot);
      setQuod(causa.quod);
    }
  }, [causa]);

  async function handleAddCausa() {
    if (!cpf || !nome || !decisao || !protocolado || !spc || !boa || !serasa || !cenprot || !quod) {
      return alert("Preencha todos os campos");
    }

    try {
      if (causa) {
        await api.put(`/casos/${causa.id}`, {
          cpf,
          nome,
          decisao,
          protocolado,
          spc,
          boa,
          serasa,
          cenprot,
          quod
        });
        alert("Cliente atualizado com sucesso!");
      } else {
        await api.post("casos", {
          cpf,
          nome,
          decisao,
          protocolado,
          spc,
          boa,
          serasa,
          cenprot,
          quod
        });
        alert("Causa criada com sucesso!");
      }
      onClose();
    } catch (error) {
      alert("Erro ao cadastrar ou atualizar causa. Tente novamente.");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={causa ? "Editar Causa" : "Adicionar Causa"} onConfirm={handleAddCausa}>
      <form>
        <label>CPF do Cliente</label>
        <ReactInputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          name="cpf"
          placeholder="Ex: 123.456.789-10"
        />

        <label>Nome do Cliente</label>
        <input
          type='text'
          name="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Ex: José da Silva"
        />

        <label>Decisão Favoravel</label>
        <input
          type='text'
          name="decisao"
          value={decisao}
          onChange={e => setDecisao(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />

        <label>Protocolado nos órgãos</label>
        <input
          type="text"
          name="protocolado"
          value={protocolado}
          onChange={e => setProtocolado(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />

        <label>Baixa SPC</label>
        <input
          type="text"
          name="spc"
          value={spc}
          onChange={e => setSpc(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />

        <label>Baixa Boa Vista</label>
        <input
          type="text"
          name="boa"
          value={boa}
          onChange={e => setBoa(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />

        <label>Baixa Serasa</label>
        <input
          type="text"
          name="serasa"
          value={serasa}
          onChange={e => setSerasa(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />

        <label>Baixa CENPROT</label>
        <input
          type='text'
          name="cen"
          value={cenprot}
          onChange={e => setCenprot(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />

        <label>Baixa QUOD</label>
        <input
          type='text'
          name="quod"
          value={quod}
          onChange={e => setQuod(e.target.value)}
          placeholder="Ex: 0 ou 100"
        />
      </form>
    </Modal>
  );
}
