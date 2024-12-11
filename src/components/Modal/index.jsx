import { ModalContainer, ModalContent, Overlay, ButtonGroup } from './styles';

// eslint-disable-next-line react/prop-types
export function Modal({ isOpen, onClose, title, children, onConfirm, confirmText = "Confirmar" }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();  
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <h2>{title}</h2>
        <ModalContent>{children}</ModalContent>
        <ButtonGroup>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleConfirm}>{confirmText}</button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}
