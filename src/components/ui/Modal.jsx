import styled from 'styled-components';
import Button from './Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #9492924d;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px 15px;
  border-radius: 4px;
  width: 320px;
  max-height: 140px;
`;

const ModalText = styled.div`
  margin: -10px 0px 30px 10px;

  h4 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #7c7878;
    line-height: 1.3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Modal = ({
  isOpen,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onClose,
  bgColor,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalText>
          <h4>{title}</h4>
          {description && <p>{description}</p>}
        </ModalText>
        <ButtonContainer>
          <Button width='150px' borderStyle='1px solid #dfdada' radius='3px' onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            width='150px'
            borderStyle='none'
            radius='3px'
            color='white'
            bgColor={bgColor}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
